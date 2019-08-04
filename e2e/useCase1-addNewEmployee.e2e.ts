import { execute, expect } from "../test/e2eTest";
import { generateHourlyRateEmployee, generateMonthlySalaryEmployee } from "../test/generators";
import { employeeRepository } from "../src/mongo";

describe("Use Case 1: Add New Employee", () => {
    it("should add an employee with a hourly rate", async () => {
        const employee = generateHourlyRateEmployee();

        await executePayrollCommand(
            `AddEmp ${employee.id} "${employee.name}" "${employee.address}" H ${employee.hourlyRate}`
        );

        const dbEmployee = await employeeRepository.fetchEmployeeById(employee.id);
        expect(dbEmployee).to.deep.equal(employee);
    });

    it("should add an employee with a monthly salary", async () => {
        const employee = generateMonthlySalaryEmployee();

        await executePayrollCommand(
            `AddEmp ${employee.id} "${employee.name}" "${employee.address}" S ${employee.monthlySalary}`
        );

        const dbEmployee = await employeeRepository.fetchEmployeeById(employee.id);
        expect(dbEmployee).to.deep.equal(employee);
    });

    it("should add an employee with a monthly salary and a commission rate", async () => {
        const employee = generateMonthlySalaryEmployee({ commissionRate: 10 });

        await executePayrollCommand(
            `AddEmp ${employee.id} "${employee.name}" "${employee.address}" C ${employee.monthlySalary} ${employee.commissionRate}`
        );

        const dbEmployee = await employeeRepository.fetchEmployeeById(employee.id);
        expect(dbEmployee).to.have.property("commissionRate", 10);
    });
});

async function executePayrollCommand(command: string): Promise<void> {
    const output = await execute("node dist/index.js " + command);
    console.log(output);
}
