import { buildStubbedUnionMemberRepository, expect, generateIndex, Stub } from "@test/unit";
import { UnionMemberRepository } from "../repositories";
import { buildRemoveEmployeeFromUnion, RemoveEmployeeFromUnion } from "./removeEmployeeFromUnion";

describe("action removeEmployeeFromUnion", () => {
    let stubbedUnionMemberRepository: Stub<UnionMemberRepository>;
    let removeEmployeeFromUnion: RemoveEmployeeFromUnion;

    beforeEach(() => {
        stubbedUnionMemberRepository = buildStubbedUnionMemberRepository();
        removeEmployeeFromUnion = buildRemoveEmployeeFromUnion({
            unionMemberRepository: stubbedUnionMemberRepository
        });
    });

    it("should delete the employee union member", async () => {
        const employeeId = generateIndex();
        stubbedUnionMemberRepository.deleteByEmployeeId.resolves();

        await removeEmployeeFromUnion(employeeId);

        expect(stubbedUnionMemberRepository.deleteByEmployeeId).to.have.been.calledOnceWith(employeeId);
    });
});
