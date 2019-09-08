import { entityGenerators, expect, generateServiceCharge, Stub } from "@test/unit";
import { NotFoundError } from "../../errors";
import { ServiceChargeRepository, UnionMemberRepository } from "../../repositories";
import { buildStubbedServiceChargeRepository, buildStubbedUnionMemberRepository } from "../../test";
import { makeCreateServiceCharge } from "./createServiceCharge";

describe("action createServiceCharge", () => {
    let stubbedServiceChargeRepository: Stub<ServiceChargeRepository>;
    let stubbedUnionMemberRepository: Stub<UnionMemberRepository>;
    let createServiceCharge: ReturnType<typeof makeCreateServiceCharge>;

    beforeEach(() => {
        stubbedServiceChargeRepository = buildStubbedServiceChargeRepository();
        stubbedUnionMemberRepository = buildStubbedUnionMemberRepository();
        createServiceCharge = makeCreateServiceCharge({
            serviceChargeRepository: stubbedServiceChargeRepository,
            unionMemberRepository: stubbedUnionMemberRepository
        });

        stubbedServiceChargeRepository.insert.resolves();
    });

    it("should create a service charge for the employee", async () => {
        const serviceCharge = generateServiceCharge();
        stubbedUnionMemberRepository.fetchByMemberId
            .withArgs(serviceCharge.memberId)
            .resolves(entityGenerators.generateUnionMember());

        await createServiceCharge(serviceCharge);

        expect(stubbedServiceChargeRepository.insert).to.have.been.calledOnceWith(serviceCharge);
    });
    it("should throw a EmployeeTypeError if no union member with this if was found", async () => {
        const serviceCharge = generateServiceCharge();
        stubbedUnionMemberRepository.fetchByMemberId
            .withArgs(serviceCharge.memberId)
            .rejects(new NotFoundError("no union member found"));

        const promise = createServiceCharge(serviceCharge);

        await expect(promise).to.be.rejectedWith(NotFoundError);
    });
});
