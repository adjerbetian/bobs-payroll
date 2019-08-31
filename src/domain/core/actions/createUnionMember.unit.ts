import { expect, generateHourlyEmployee, generateUnionMember, Stub } from "@test/unit";
import { UnionMember } from "../entities";
import { NotFoundError, UnionMemberIdAlreadyUsedError } from "../errors";
import { EmployeeRepository, UnionMemberRepository } from "../repositories";
import { buildStubbedEmployeeRepository, buildStubbedUnionMemberRepository } from "../test";
import { buildCreateUnionMember, CreateUnionMember } from "./createUnionMember";

describe("action createUnionMember", () => {
    let stubbedUnionMemberRepository: Stub<UnionMemberRepository>;
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let createUnionMember: CreateUnionMember;

    let unionMember: UnionMember;

    beforeEach(() => {
        stubbedUnionMemberRepository = buildStubbedUnionMemberRepository();
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        createUnionMember = buildCreateUnionMember({
            unionMemberRepository: stubbedUnionMemberRepository,
            employeeRepository: stubbedEmployeeRepository
        });
    });

    beforeEach(() => {
        stubbedUnionMemberRepository.insert.resolves();

        unionMember = generateUnionMember();
        stubbedEmployeeRepository.fetchById.withArgs(unionMember.employeeId).resolves(generateHourlyEmployee());
        stubbedUnionMemberRepository.exists.resolves(false);
    });

    it("should create a union member", async () => {
        await createUnionMember(unionMember);

        expect(stubbedUnionMemberRepository.insert).to.have.been.calledOnceWith(unionMember);
    });
    it("should not create a union member if the employee does not exist", async () => {
        stubbedEmployeeRepository.fetchById.withArgs(unionMember.employeeId).rejects(new NotFoundError("not found"));

        const promise = createUnionMember(unionMember);

        await expect(promise).to.be.rejectedWith(NotFoundError);
    });
    it("should throw a UnionMemberIdAlreadyUsedError if the member id already exists", async () => {
        stubbedUnionMemberRepository.exists
            .withArgs({ memberId: unionMember.memberId, employeeId: unionMember.employeeId })
            .resolves(false);
        stubbedUnionMemberRepository.exists.withArgs({ memberId: unionMember.memberId }).resolves(true);

        const promise = createUnionMember(unionMember);

        await expect(promise).to.be.rejectedWith(UnionMemberIdAlreadyUsedError);
    });
});
