import { executePayrollCommand, expect } from "../test/e2eTest";
import { generateHourlyRateEmployee } from "../test/generators";
import { employeeRepository } from "../src/mongo";

describe("Use Case 2: Deleting an Employee", () => {
    it("should delete an existing employee from the database", async () => {
        const employee = generateHourlyRateEmployee();
        await employeeRepository.insertOne(employee);

        await executePayrollCommand(`DelEmp ${employee.id}`);

        const employeeExistsInDB = await employeeRepository.exists({ id: employee.id });
        expect(employeeExistsInDB).to.be.false;
    });

    it("should do nothing when the userId does not exist", async () => {
        const employee = generateHourlyRateEmployee();
        await employeeRepository.insertOne(employee);

        await executePayrollCommand(`DelEmp ${employee.id + 1}`);

        const employeeExistsInDB = await employeeRepository.exists({ id: employee.id });
        expect(employeeExistsInDB).to.be.true;
    });
});
