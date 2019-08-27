import { buildFakeEmployeeRepository, buildFakeUnionMemberRepository, Fake } from "../../../../test/fakeBuilders";
import { generateHourlyEmployee, generateUnionMember } from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { UnionMember } from "../entities";
import { NotFoundError, UnionMemberIdAlreadyUsedError } from "../errors";
import { EmployeeRepository, UnionMemberRepository } from "../repositories";
import { buildCreateUnionMemberAction, CreateUnionMemberAction } from "./createUnionMember";

describe("action createUnionMember", () => {
    let fakeUnionMemberRepository: Fake<UnionMemberRepository>;
    let fakeEmployeeRepository: Fake<EmployeeRepository>;
    let createUnionMember: CreateUnionMemberAction;

    let unionMember: UnionMember;

    beforeEach(() => {
        fakeUnionMemberRepository = buildFakeUnionMemberRepository();
        fakeEmployeeRepository = buildFakeEmployeeRepository();
        createUnionMember = buildCreateUnionMemberAction({
            unionMemberRepository: fakeUnionMemberRepository,
            employeeRepository: fakeEmployeeRepository
        });
    });

    beforeEach(() => {
        fakeUnionMemberRepository.insert.resolves();

        unionMember = generateUnionMember();
        fakeEmployeeRepository.fetchById.withArgs(unionMember.employeeId).resolves(generateHourlyEmployee());
        fakeUnionMemberRepository.exists.resolves(false);
    });

    it("should create a union member", async () => {
        await createUnionMember(unionMember);

        expect(fakeUnionMemberRepository.insert).to.have.been.calledOnceWith(unionMember);
    });
    it("should not create a union member if the employee does not exist", async () => {
        fakeEmployeeRepository.fetchById.withArgs(unionMember.employeeId).rejects(new NotFoundError("not found"));

        const promise = createUnionMember(unionMember);

        await expect(promise).to.be.rejectedWith(NotFoundError);
    });
    it("should update the union member rate if the union member already exists", async () => {
        fakeUnionMemberRepository.exists
            .withArgs({ memberId: unionMember.memberId, employeeId: unionMember.employeeId })
            .resolves(true);
        fakeUnionMemberRepository.update.resolves();

        await createUnionMember(unionMember);

        await expect(fakeUnionMemberRepository.insert).not.to.have.been.called;
        await expect(fakeUnionMemberRepository.update).to.have.been.calledOnceWith(unionMember);
    });
    it("should throw a UnionMemberIdAlreadyUsedError if the member id already exists", async () => {
        fakeUnionMemberRepository.exists
            .withArgs({ memberId: unionMember.memberId, employeeId: unionMember.employeeId })
            .resolves(false);
        fakeUnionMemberRepository.exists.withArgs({ memberId: unionMember.memberId }).resolves(true);

        const promise = createUnionMember(unionMember);

        await expect(promise).to.be.rejectedWith(UnionMemberIdAlreadyUsedError);
    });
});
