import { buildFakeUnionMemberRepository, Fake } from "../../../../test/fakeBuilders";
import { generateIndex } from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { UnionMemberRepository } from "../repositories";
import { buildRemoveEmployeeFromUnionAction, RemoveEmployeeFromUnionAction } from "./removeEmployeeFromUnion";

describe("action removeEmployeeFromUnion", () => {
    let fakeUnionMemberRepository: Fake<UnionMemberRepository>;
    let removeEmployeeFromUnion: RemoveEmployeeFromUnionAction;

    beforeEach(() => {
        fakeUnionMemberRepository = buildFakeUnionMemberRepository();
        removeEmployeeFromUnion = buildRemoveEmployeeFromUnionAction({
            unionMemberRepository: fakeUnionMemberRepository
        });
    });

    it("should delete the employee union member", async () => {
        const employeeId = generateIndex();
        fakeUnionMemberRepository.deleteByEmployeeId.resolves();

        await removeEmployeeFromUnion(employeeId);

        expect(fakeUnionMemberRepository.deleteByEmployeeId).to.have.been.calledOnceWith(employeeId);
    });
});
