import { generators, expect, Stub } from "../../../../../../test/unit";
import { UnionMembership } from "../../entities";
import { NotFoundError, UnionMemberIdAlreadyUsedError } from "../../errors";
import { EmployeeRepository, UnionMembershipRepository } from "../../repositories";
import { buildStubbedEmployeeRepository, buildStubbedUnionMembershipRepository } from "../../test";
import { makeCreateUnionMembership } from "./createUnionMembership";

describe("use case - createUnionMembership", () => {
    let stubbedUnionMembershipRepository: Stub<UnionMembershipRepository>;
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let createUnionMembership: ReturnType<typeof makeCreateUnionMembership>;

    let unionMembership: UnionMembership;

    beforeEach(() => {
        stubbedUnionMembershipRepository = buildStubbedUnionMembershipRepository();
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        createUnionMembership = makeCreateUnionMembership({
            unionMembershipRepository: stubbedUnionMembershipRepository,
            employeeRepository: stubbedEmployeeRepository
        });
    });

    beforeEach(() => {
        stubbedUnionMembershipRepository.insert.resolves();

        unionMembership = generators.generateUnionMembership();
        stubbedEmployeeRepository.fetchById
            .withArgs(unionMembership.getEmployeeId())
            .resolves(generators.generateHourlyEmployee());
        stubbedUnionMembershipRepository.doesMemberIdExist.resolves(false);
    });

    it("should create a union membership", async () => {
        await createUnionMembershipFromEntity(unionMembership);

        expect(stubbedUnionMembershipRepository.insert).to.have.been.calledOnceWithEntity(unionMembership);
    });
    it("should not create a union membership if the employee does not exist", async () => {
        stubbedEmployeeRepository.fetchById
            .withArgs(unionMembership.getEmployeeId())
            .rejects(new NotFoundError("not found"));

        const promise = createUnionMembershipFromEntity(unionMembership);

        await expect(promise).to.be.rejectedWith(NotFoundError);
    });
    it("should throw a UnionMemberIdAlreadyUsedError if the member id already exists", async () => {
        stubbedUnionMembershipRepository.doesMemberIdExist.withArgs(unionMembership.getMemberId()).resolves(true);

        const promise = createUnionMembershipFromEntity(unionMembership);

        await expect(promise).to.be.rejectedWith(UnionMemberIdAlreadyUsedError);
    });

    async function createUnionMembershipFromEntity(entity: UnionMembership): Promise<void> {
        await createUnionMembership({
            employeeId: entity.getEmployeeId(),
            memberId: entity.getMemberId(),
            rate: entity.getRate()
        });
    }
});
