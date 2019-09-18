import { seeders, executePayrollCommand, expect } from "@test/e2e";
import { dbEmployees } from "../app";

describe("Use Case 2: Deleting an Employee", () => {
    it("should delete an existing employee from the database", async () => {
        const employee = await seeders.seedHourlyEmployee();

        await executePayrollCommand(`DelEmp ${employee.getId()}`);

        const employeeExistsInDb = await dbEmployees.exists({ id: employee.getId() });
        expect(employeeExistsInDb).to.be.false;
    });
    it("should do nothing when the userId does not exist", async () => {
        const employee = await seeders.seedHourlyEmployee();

        await executePayrollCommand(`DelEmp ${employee.getId() + 1}`);

        const employeeExistsInDb = await dbEmployees.exists({ id: employee.getId() });
        expect(employeeExistsInDb).to.be.true;
    });
});
