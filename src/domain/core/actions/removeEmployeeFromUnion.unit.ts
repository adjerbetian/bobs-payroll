import { buildStubUnionMemberRepository, expect, generateIndex, Stub } from "@test/unit";
import { UnionMemberRepository } from "../repositories";
import { buildRemoveEmployeeFromUnionAction, RemoveEmployeeFromUnionAction } from "./removeEmployeeFromUnion";

describe("action removeEmployeeFromUnion", () => {
    let stubUnionMemberRepository: Stub<UnionMemberRepository>;
    let removeEmployeeFromUnion: RemoveEmployeeFromUnionAction;

    beforeEach(() => {
        stubUnionMemberRepository = buildStubUnionMemberRepository();
        removeEmployeeFromUnion = buildRemoveEmployeeFromUnionAction({
            unionMemberRepository: stubUnionMemberRepository
        });
    });

    it("should delete the employee union member", async () => {
        const employeeId = generateIndex();
        stubUnionMemberRepository.deleteByEmployeeId.resolves();

        await removeEmployeeFromUnion(employeeId);

        expect(stubUnionMemberRepository.deleteByEmployeeId).to.have.been.calledOnceWith(employeeId);
    });
});
