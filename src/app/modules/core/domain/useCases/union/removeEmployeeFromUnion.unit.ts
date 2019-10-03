import { expect, generateIndex, Stub } from "@test/unit";
import { UnionMemberRepository } from "../../repositories";
import { buildStubbedUnionMemberRepository } from "../../test";
import { makeRemoveEmployeeFromUnion } from "./removeEmployeeFromUnion";

describe("use case - removeEmployeeFromUnion", () => {
    let stubbedUnionMemberRepository: Stub<UnionMemberRepository>;
    let removeEmployeeFromUnion: ReturnType<typeof makeRemoveEmployeeFromUnion>;

    beforeEach(() => {
        stubbedUnionMemberRepository = buildStubbedUnionMemberRepository();
        removeEmployeeFromUnion = makeRemoveEmployeeFromUnion({
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
