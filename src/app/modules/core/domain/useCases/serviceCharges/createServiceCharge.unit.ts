import { generators, expect, Stub } from "@test/unit";
import { NotFoundError } from "../../errors";
import { ServiceChargeRepository, UnionMembershipRepository } from "../../repositories";
import { buildStubbedServiceChargeRepository, buildStubbedUnionMembershipRepository } from "../../test";
import { makeCreateServiceCharge } from "./createServiceCharge";

describe("use case - createServiceCharge", () => {
    let stubbedServiceChargeRepository: Stub<ServiceChargeRepository>;
    let stubbedUnionMembershipRepository: Stub<UnionMembershipRepository>;
    let createServiceCharge: ReturnType<typeof makeCreateServiceCharge>;

    beforeEach(() => {
        stubbedServiceChargeRepository = buildStubbedServiceChargeRepository();
        stubbedUnionMembershipRepository = buildStubbedUnionMembershipRepository();
        createServiceCharge = makeCreateServiceCharge({
            serviceChargeRepository: stubbedServiceChargeRepository,
            unionMembershipRepository: stubbedUnionMembershipRepository
        });

        stubbedServiceChargeRepository.insert.resolves();
    });

    it("should create a service charge for the employee", async () => {
        const serviceCharge = generators.generateServiceCharge();
        stubbedUnionMembershipRepository.fetchByMemberId
            .withArgs(serviceCharge.getMemberId())
            .resolves(generators.generateUnionMembership());

        await createServiceCharge({
            memberId: serviceCharge.getMemberId(),
            amount: serviceCharge.getAmount()
        });

        expect(stubbedServiceChargeRepository.insert).to.have.been.calledOnceWithEntity(serviceCharge);
    });
    it("should throw a EmployeeTypeError if no union membership with this id was found", async () => {
        const serviceCharge = generators.generateServiceCharge();
        stubbedUnionMembershipRepository.fetchByMemberId
            .withArgs(serviceCharge.getMemberId())
            .rejects(new NotFoundError("no union membership found"));

        const promise = createServiceCharge({
            memberId: serviceCharge.getMemberId(),
            amount: serviceCharge.getAmount()
        });

        await expect(promise).to.be.rejectedWith(NotFoundError);
    });
});
