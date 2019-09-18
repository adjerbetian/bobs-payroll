import { generators, expect, Stub } from "@test/unit";
import { UnionMember } from "../../entities";
import { NotFoundError, UnionMemberIdAlreadyUsedError } from "../../errors";
import { EmployeeRepository, UnionMemberRepository } from "../../repositories";
import { buildStubbedEmployeeRepository, buildStubbedUnionMemberRepository } from "../../test";
import { makeCreateUnionMember } from "./createUnionMember";

describe("action createUnionMember", () => {
    let stubbedUnionMemberRepository: Stub<UnionMemberRepository>;
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let createUnionMember: ReturnType<typeof makeCreateUnionMember>;

    let unionMember: UnionMember;

    beforeEach(() => {
        stubbedUnionMemberRepository = buildStubbedUnionMemberRepository();
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        createUnionMember = makeCreateUnionMember({
            unionMemberRepository: stubbedUnionMemberRepository,
            employeeRepository: stubbedEmployeeRepository
        });
    });

    beforeEach(() => {
        stubbedUnionMemberRepository.insert.resolves();

        unionMember = generators.generateUnionMember();
        stubbedEmployeeRepository.fetchById
            .withArgs(unionMember.getEmployeeId())
            .resolves(generators.generateHourlyEmployee());
        stubbedUnionMemberRepository.doesMemberIdExist.resolves(false);
    });

    it("should create a union member", async () => {
        await createUnionMemberFromEntity(unionMember);

        expect(stubbedUnionMemberRepository.insert).to.have.been.calledOnceWithEntity(unionMember);
    });
    it("should not create a union member if the employee does not exist", async () => {
        stubbedEmployeeRepository.fetchById
            .withArgs(unionMember.getEmployeeId())
            .rejects(new NotFoundError("not found"));

        const promise = createUnionMemberFromEntity(unionMember);

        await expect(promise).to.be.rejectedWith(NotFoundError);
    });
    it("should throw a UnionMemberIdAlreadyUsedError if the member id already exists", async () => {
        stubbedUnionMemberRepository.doesMemberIdExist.withArgs(unionMember.getMemberId()).resolves(true);

        const promise = createUnionMemberFromEntity(unionMember);

        await expect(promise).to.be.rejectedWith(UnionMemberIdAlreadyUsedError);
    });

    async function createUnionMemberFromEntity(entity: UnionMember): Promise<void> {
        await createUnionMember({
            employeeId: entity.getEmployeeId(),
            memberId: entity.getMemberId(),
            rate: entity.getRate()
        });
    }
});
