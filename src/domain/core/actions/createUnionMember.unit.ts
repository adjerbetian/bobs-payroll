import { buildFakeUnionMemberRepository, Fake } from "../../../../test/fakeBuilders";
import { generateUnionMember } from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { UnionMemberRepository } from "../repositories";
import { buildCreateUnionMemberAction, CreateUnionMemberAction } from "./createUnionMember";

describe("action createUnionMember", () => {
    let fakeUnionMemberRepository: Fake<UnionMemberRepository>;
    let createUnionMember: CreateUnionMemberAction;

    beforeEach(() => {
        fakeUnionMemberRepository = buildFakeUnionMemberRepository();
        createUnionMember = buildCreateUnionMemberAction({
            unionMemberRepository: fakeUnionMemberRepository
        });

        fakeUnionMemberRepository.insert.resolves();
    });

    it("should create a union member", async () => {
        const unionMember = generateUnionMember();

        await createUnionMember(unionMember);

        expect(fakeUnionMemberRepository.insert).to.have.been.calledOnceWith(unionMember);
    });
});
