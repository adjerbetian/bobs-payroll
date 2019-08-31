import { buildStubUnionMemberRepository, expect, generateIndex, Stub } from "@test/unit";
import { UnionMemberRepository } from "../repositories";
import { buildRemoveEmployeeFromUnion, RemoveEmployeeFromUnion } from "./removeEmployeeFromUnion";

describe("action removeEmployeeFromUnion", () => {
    let stubUnionMemberRepository: Stub<UnionMemberRepository>;
    let removeEmployeeFromUnion: RemoveEmployeeFromUnion;

    beforeEach(() => {
        stubUnionMemberRepository = buildStubUnionMemberRepository();
        removeEmployeeFromUnion = buildRemoveEmployeeFromUnion({
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
