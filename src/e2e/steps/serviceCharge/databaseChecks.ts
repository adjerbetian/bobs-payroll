import { expect } from "@test/utils";
import { Then } from "cucumber";
import { dbServiceCharges, dbUnionMembers } from "../../../app";
import { store } from "../../utils";

Then("{string} should have the service charge {string}", async (employeeName: string, serviceChargeName: string) => {
    const employee = store.employees.get(employeeName);
    const serviceCharge = store.serviceCharges.get(serviceChargeName);

    const unionMemberInDB = await dbUnionMembers.fetch({ employeeId: employee.getId() });
    const serviceChargesInDB = await dbServiceCharges.fetchAll({ memberId: unionMemberInDB.getMemberId() });
    expect(serviceChargesInDB).entities.to.include(serviceCharge);
});
Then("the service charge {string} should not have been inserted", async (name: string) => {
    const serviceCharge = store.serviceCharges.get(name);
    const serviceChargesExistsInDB = await dbServiceCharges.exists({ memberId: serviceCharge.getMemberId() });
    expect(serviceChargesExistsInDB).to.be.false;
});
