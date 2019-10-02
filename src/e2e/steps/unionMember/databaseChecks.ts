import { expect } from "@test/utils";
import { Then } from "cucumber";
import { dbUnionMembers } from "../../../app";
import { store } from "../../utils";

Then(/^(\w+) should have the union membership (\w+)$/, async (name: string, membershipName: string) => {
    const employee = store.employees.get(name);
    const unionMember = store.unionMembers.get(membershipName);

    const unionMemberInDB = await dbUnionMembers.fetch({ employeeId: employee.getId() });
    expect(unionMemberInDB).entity.to.equal(unionMember);
});
Then("the union membership {string} should not exist in db", async (name: string) => {
    const unionMember = store.unionMembers.get(name);

    const unionMemberExistsInDB = await dbUnionMembers.exists({
        memberId: unionMember.getMemberId(),
        employeeId: unionMember.getEmployeeId()
    });
    expect(unionMemberExistsInDB).to.be.false;
});
