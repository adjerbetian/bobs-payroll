import { mongoEmployeeRepository } from "../src";
import { createHourlyRateEmployee } from "../test/creators";
import { executePayrollCommand, expect } from "../test/e2eTest";

describe("Use Case 2: Deleting an Employee", () => {
    it("should delete an existing employee from the database", async () => {
        const employee = await createHourlyRateEmployee();

        await executePayrollCommand(`DelEmp ${employee.id}`);

        const employeeExistsInDB = await mongoEmployeeRepository.exists({ id: employee.id });
        expect(employeeExistsInDB).to.be.false;
    });
    it("should do nothing when the userId does not exist", async () => {
        const employee = await createHourlyRateEmployee();

        await executePayrollCommand(`DelEmp ${employee.id + 1}`);

        const employeeExistsInDB = await mongoEmployeeRepository.exists({ id: employee.id });
        expect(employeeExistsInDB).to.be.true;
    });
});
