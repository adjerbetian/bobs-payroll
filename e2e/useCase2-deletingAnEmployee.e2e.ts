import { dbModelSeeders, executePayrollCommand, expect } from "@test/e2e";
import { dbEmployees } from "../src";

describe("Use Case 2: Deleting an Employee", () => {
    it("should delete an existing employee from the database", async () => {
        const employee = await dbModelSeeders.seedHourlyEmployee();

        await executePayrollCommand(`DelEmp ${employee.id}`);

        const employeeExistsInDb = await dbEmployees.exists({ id: employee.id });
        expect(employeeExistsInDb).to.be.false;
    });
    it("should do nothing when the userId does not exist", async () => {
        const employee = await dbModelSeeders.seedHourlyEmployee();

        await executePayrollCommand(`DelEmp ${employee.id + 1}`);

        const employeeExistsInDb = await dbEmployees.exists({ id: employee.id });
        expect(employeeExistsInDb).to.be.true;
    });
});
