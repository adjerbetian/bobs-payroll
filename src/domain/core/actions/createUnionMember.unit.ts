import { buildStubEmployeeRepository, buildStubUnionMemberRepository, Stub } from "../../../../test/stubBuilders";
import { generateHourlyEmployee, generateUnionMember } from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { UnionMember } from "../entities";
import { NotFoundError, UnionMemberIdAlreadyUsedError } from "../errors";
import { EmployeeRepository, UnionMemberRepository } from "../repositories";
import { buildCreateUnionMemberAction, CreateUnionMemberAction } from "./createUnionMember";

describe("action createUnionMember", () => {
    let stubUnionMemberRepository: Stub<UnionMemberRepository>;
    let stubEmployeeRepository: Stub<EmployeeRepository>;
    let createUnionMember: CreateUnionMemberAction;

    let unionMember: UnionMember;

    beforeEach(() => {
        stubUnionMemberRepository = buildStubUnionMemberRepository();
        stubEmployeeRepository = buildStubEmployeeRepository();
        createUnionMember = buildCreateUnionMemberAction({
            unionMemberRepository: stubUnionMemberRepository,
            employeeRepository: stubEmployeeRepository
        });
    });

    beforeEach(() => {
        stubUnionMemberRepository.insert.resolves();

        unionMember = generateUnionMember();
        stubEmployeeRepository.fetchById.withArgs(unionMember.employeeId).resolves(generateHourlyEmployee());
        stubUnionMemberRepository.exists.resolves(false);
    });

    it("should create a union member", async () => {
        await createUnionMember(unionMember);

        expect(stubUnionMemberRepository.insert).to.have.been.calledOnceWith(unionMember);
    });
    it("should not create a union member if the employee does not exist", async () => {
        stubEmployeeRepository.fetchById.withArgs(unionMember.employeeId).rejects(new NotFoundError("not found"));

        const promise = createUnionMember(unionMember);

        await expect(promise).to.be.rejectedWith(NotFoundError);
    });
    it("should throw a UnionMemberIdAlreadyUsedError if the member id already exists", async () => {
        stubUnionMemberRepository.exists
            .withArgs({ memberId: unionMember.memberId, employeeId: unionMember.employeeId })
            .resolves(false);
        stubUnionMemberRepository.exists.withArgs({ memberId: unionMember.memberId }).resolves(true);

        const promise = createUnionMember(unionMember);

        await expect(promise).to.be.rejectedWith(UnionMemberIdAlreadyUsedError);
    });
});
