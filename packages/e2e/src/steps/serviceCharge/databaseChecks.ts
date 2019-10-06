import { dbServiceCharges, dbUnionMembers } from "@bobs-payroll/modules";
import { expect } from "@bobs-payroll/test";
import { Then } from "cucumber";
import { store } from "../../utils";

Then(
    /^(\w+) should( not)? have the service charge (\w+)$/,
    async (employeeName: string, isNegated: string | undefined, serviceChargeName: string) => {
        const employee = store.employees.get(employeeName);
        const serviceCharge = store.serviceCharges.get(serviceChargeName);

        if (isNegated) {
            const serviceChargesExistsInDB = await dbServiceCharges.exists({ memberId: serviceCharge.getMemberId() });
            expect(serviceChargesExistsInDB).to.be.false;
        } else {
            const unionMemberInDB = await dbUnionMembers.fetch({ employeeId: employee.getId() });
            const serviceChargesInDB = await dbServiceCharges.fetchAll({ memberId: unionMemberInDB.getMemberId() });
            expect(serviceChargesInDB).entities.to.include(serviceCharge);
        }
    }
);
