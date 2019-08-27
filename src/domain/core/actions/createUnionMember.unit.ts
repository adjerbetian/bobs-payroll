import { buildFakeEmployeeRepository, buildFakeUnionMemberRepository, Fake } from "../../../../test/fakeBuilders";
import { generateHourlyEmployee, generateUnionMember } from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { NotFoundError } from "../errors";
import { EmployeeRepository, UnionMemberRepository } from "../repositories";
import { buildCreateUnionMemberAction, CreateUnionMemberAction } from "./createUnionMember";

describe("action createUnionMember", () => {
    let fakeUnionMemberRepository: Fake<UnionMemberRepository>;
    let fakeEmployeeRepository: Fake<EmployeeRepository>;
    let createUnionMember: CreateUnionMemberAction;

    beforeEach(() => {
        fakeUnionMemberRepository = buildFakeUnionMemberRepository();
        fakeEmployeeRepository = buildFakeEmployeeRepository();
        createUnionMember = buildCreateUnionMemberAction({
            unionMemberRepository: fakeUnionMemberRepository,
            employeeRepository: fakeEmployeeRepository
        });

        fakeUnionMemberRepository.insert.resolves();
    });

    it("should create a union member", async () => {
        const unionMember = generateUnionMember();
        fakeEmployeeRepository.fetchById.withArgs(unionMember.employeeId).resolves(generateHourlyEmployee());

        await createUnionMember(unionMember);

        expect(fakeUnionMemberRepository.insert).to.have.been.calledOnceWith(unionMember);
    });
    it("should not create a union member if the employee does not exist", async () => {
        const unionMember = generateUnionMember();
        fakeEmployeeRepository.fetchById.withArgs(unionMember.employeeId).rejects(new NotFoundError("not found"));

        const promise = createUnionMember(unionMember);

        await expect(promise).to.be.rejectedWith(NotFoundError);
    });
});
