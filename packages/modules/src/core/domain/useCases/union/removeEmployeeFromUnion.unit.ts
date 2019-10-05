import { expect, generateIndex, Stub } from "@bobs-payroll/test";
import { UnionMembershipRepository } from "../../repositories";
import { buildStubbedUnionMembershipRepository } from "../../test";
import { makeRemoveEmployeeFromUnion } from "./removeEmployeeFromUnion";

describe("use case - removeEmployeeFromUnion", () => {
    let stubbedUnionMembershipRepository: Stub<UnionMembershipRepository>;
    let removeEmployeeFromUnion: ReturnType<typeof makeRemoveEmployeeFromUnion>;

    beforeEach(() => {
        stubbedUnionMembershipRepository = buildStubbedUnionMembershipRepository();
        removeEmployeeFromUnion = makeRemoveEmployeeFromUnion({
            unionMembershipRepository: stubbedUnionMembershipRepository
        });
    });

    it("should delete the employee union membership", async () => {
        const employeeId = generateIndex();
        stubbedUnionMembershipRepository.deleteByEmployeeId.resolves();

        await removeEmployeeFromUnion(employeeId);

        expect(stubbedUnionMembershipRepository.deleteByEmployeeId).to.have.been.calledOnceWith(employeeId);
    });
});
