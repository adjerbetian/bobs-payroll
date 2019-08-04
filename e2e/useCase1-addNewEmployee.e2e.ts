import { execute, expect } from "../src/test/e2eTest";
import { generateEmployee } from "../src/test/generators";
import { employeeRepository } from "../src/mongo";

describe("Use Case 1: Add New Employee", () => {
    it("should add an employee with a hourly rate", async () => {
        const employee = generateEmployee();

        await executePayrollCommand(
            `AddEmp ${employee.id} "${employee.name}" "${employee.address}" H ${employee.rate}`
        );

        const dbEmployee = await employeeRepository.fetchEmployeeById(employee.id);
        expect(dbEmployee).to.deep.equal(employee);
    });
});

async function executePayrollCommand(command: string): Promise<string> {
    return execute("node dist/index.js " + command);
}
