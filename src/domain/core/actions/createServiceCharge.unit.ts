import { buildStubServiceChargeRepository, buildStubUnionMemberRepository, Stub } from "../../../../test/stubBuilders";
import { generateServiceCharge, generateUnionMember } from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { NotFoundError } from "../errors";
import { ServiceChargeRepository, UnionMemberRepository } from "../repositories";
import { buildCreateServiceChargeAction, CreateServiceChargeAction } from "./createServiceCharge";

describe("action createServiceCharge", () => {
    let stubServiceChargeRepository: Stub<ServiceChargeRepository>;
    let stubUnionMemberRepository: Stub<UnionMemberRepository>;
    let createServiceCharge: CreateServiceChargeAction;

    beforeEach(() => {
        stubServiceChargeRepository = buildStubServiceChargeRepository();
        stubUnionMemberRepository = buildStubUnionMemberRepository();
        createServiceCharge = buildCreateServiceChargeAction({
            serviceChargeRepository: stubServiceChargeRepository,
            unionMemberRepository: stubUnionMemberRepository
        });

        stubServiceChargeRepository.insert.resolves();
    });

    it("should create a service charge for the employee", async () => {
        const serviceCharge = generateServiceCharge();
        stubUnionMemberRepository.fetchByMemberId.withArgs(serviceCharge.memberId).resolves(generateUnionMember());

        await createServiceCharge(serviceCharge);

        expect(stubServiceChargeRepository.insert).to.have.been.calledOnceWith(serviceCharge);
    });
    it("should throw a EmployeeTypeError if no union member with this if was found", async () => {
        const serviceCharge = generateServiceCharge();
        stubUnionMemberRepository.fetchByMemberId
            .withArgs(serviceCharge.memberId)
            .rejects(new NotFoundError("no union member found"));

        const promise = createServiceCharge(serviceCharge);

        await expect(promise).to.be.rejectedWith(NotFoundError);
    });
});
