import { expect } from "@test/utils";
import { Then } from "cucumber";
import { dbUnionMembers } from "../../../app";
import { store } from "../../utils";

Then(/^(\w+) should have the union membership (\w+)$/, async (name: string, membershipName: string) => {
    const employee = store.employees.get(name);
    const unionMembership = store.unionMembers.get(membershipName);

    const unionMemberInDB = await dbUnionMembers.fetch({ employeeId: employee.getId() });
    expect(unionMemberInDB).entity.to.equal(unionMembership);
});
Then(/^the union membership (\w+) should not exist in db$/, async (name: string) => {
    const unionMembership = store.unionMembers.get(name);

    const unionMembershipExistsInDB = await dbUnionMembers.exists({
        memberId: unionMembership.getMemberId(),
        employeeId: unionMembership.getEmployeeId()
    });
    expect(unionMembershipExistsInDB).to.be.false;
});
