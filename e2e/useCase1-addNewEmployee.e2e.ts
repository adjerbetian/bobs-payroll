import { Employee } from "../src/entities";
import { employeeRepository } from "../src/mongo";
import { executePayrollCommand, expect } from "../test/e2eTest";
import {
    generateCommissionedSalaryEmployee,
    generateHourlyRateEmployee,
    generateMonthlySalaryEmployee
} from "../test/generators";

describe("Use Case 1: Add New Employee", () => {
    it("should add an employee with a hourly rate", async () => {
        const employee = generateHourlyRateEmployee();

        await executePayrollCommand(
            `AddEmp ${employee.id} "${employee.name}" "${employee.address}" H ${employee.hourlyRate}`
        );

        await expectUserToExistInDB(employee);
    });
    it("should add an employee with a monthly salary", async () => {
        const employee = generateMonthlySalaryEmployee();

        await executePayrollCommand(
            `AddEmp ${employee.id} "${employee.name}" "${employee.address}" S ${employee.monthlySalary}`
        );

        await expectUserToExistInDB(employee);
    });
    it("should add an employee with a monthly commission rate", async () => {
        const employee = generateCommissionedSalaryEmployee();

        await executePayrollCommand(
            `AddEmp ${employee.id} "${employee.name}" "${employee.address}" C ${employee.monthlySalary} ${employee.commissionRate}`
        );

        await expectUserToExistInDB(employee);
    });
    it("should do nothing when the transaction is wrongly put", async () => {
        const employee = generateCommissionedSalaryEmployee();

        await executePayrollCommand(
            `AddEmp ${employee.id} "${employee.name}" "${employee.address}" C ${employee.monthlySalary}`
        );

        const employeeExistsInDB = await employeeRepository.exists({ id: employee.id });
        expect(employeeExistsInDB).to.be.false;
    });
});

async function expectUserToExistInDB(employee: Employee): Promise<void> {
    const dbEmployee = await employeeRepository.fetchEmployeeById(employee.id);
    expect(dbEmployee).to.deep.equal(employee);
}
