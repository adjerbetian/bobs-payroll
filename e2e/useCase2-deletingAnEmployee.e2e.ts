import { mongoEmployeeRepository } from "../src";
import { seedHourlyEmployee } from "../test/seeders";
import { executePayrollCommand, expect } from "../test/e2eTest";

describe("Use Case 2: Deleting an Employee", () => {
    it("should delete an existing employee from the database", async () => {
        const employee = await seedHourlyEmployee();

        await executePayrollCommand(`DelEmp ${employee.id}`);

        const employeeExistsInDb = await mongoEmployeeRepository.exists({ id: employee.id });
        expect(employeeExistsInDb).to.be.false;
    });
    it("should do nothing when the userId does not exist", async () => {
        const employee = await seedHourlyEmployee();

        await executePayrollCommand(`DelEmp ${employee.id + 1}`);

        const employeeExistsInDb = await mongoEmployeeRepository.exists({ id: employee.id });
        expect(employeeExistsInDb).to.be.true;
    });
});
