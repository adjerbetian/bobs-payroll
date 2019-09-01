import { expect, generateIndex, Stub } from "@test/unit";
import { UnionMemberRepository } from "../../repositories";
import { buildStubbedUnionMemberRepository } from "../../test";
import { buildRemoveEmployeeFromUnion } from "./removeEmployeeFromUnion";

describe("action removeEmployeeFromUnion", () => {
    let stubbedUnionMemberRepository: Stub<UnionMemberRepository>;
    let removeEmployeeFromUnion: ReturnType<typeof buildRemoveEmployeeFromUnion>;

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
