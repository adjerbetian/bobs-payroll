import { buildFakeServiceChargeRepository, buildFakeUnionMemberRepository, Fake } from "../../../../test/fakeBuilders";
import { generateServiceCharge, generateUnionMember } from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { NotFoundError } from "../errors";
import { ServiceChargeRepository, UnionMemberRepository } from "../repositories";
import { buildCreateServiceChargeAction, CreateServiceChargeAction } from "./createServiceCharge";

describe("action createServiceCharge", () => {
    let fakeServiceChargeRepository: Fake<ServiceChargeRepository>;
    let fakeUnionMemberRepository: Fake<UnionMemberRepository>;
    let createServiceCharge: CreateServiceChargeAction;

    beforeEach(() => {
        fakeServiceChargeRepository = buildFakeServiceChargeRepository();
        fakeUnionMemberRepository = buildFakeUnionMemberRepository();
        createServiceCharge = buildCreateServiceChargeAction({
            serviceChargeRepository: fakeServiceChargeRepository,
            unionMemberRepository: fakeUnionMemberRepository
        });

        fakeServiceChargeRepository.insert.resolves();
    });

    it("should create a service charge for the employee", async () => {
        const serviceCharge = generateServiceCharge();
        fakeUnionMemberRepository.fetchByMemberId.withArgs(serviceCharge.memberId).resolves(generateUnionMember());

        await createServiceCharge(serviceCharge);

        expect(fakeServiceChargeRepository.insert).to.have.been.calledOnceWith(serviceCharge);
    });
    it("should throw a EmployeeTypeError if no union member with this if was found", async () => {
        const serviceCharge = generateServiceCharge();
        fakeUnionMemberRepository.fetchByMemberId
            .withArgs(serviceCharge.memberId)
            .rejects(new NotFoundError("no union member found"));

        const promise = createServiceCharge(serviceCharge);

        await expect(promise).to.be.rejectedWith(NotFoundError);
    });
});
