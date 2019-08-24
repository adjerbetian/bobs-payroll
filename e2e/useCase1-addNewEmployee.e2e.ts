import { Employee, mongoEmployeeRepository } from "../src";
import { executePayrollCommand, expect } from "../test/e2eTest";
import {
    generateCommissionedSalaryEmployee,
    generateHourlyEmployee,
    generateMonthlySalaryEmployee
} from "../test/generators";

describe("Use Case 1: Add New Employee", () => {
    it("should add an hourly employee", async () => {
        const employee = generateHourlyEmployee();

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

        const employeeExistsInDB = await mongoEmployeeRepository.exists({ id: employee.id });
        expect(employeeExistsInDB).to.be.false;
    });
});

async function expectUserToExistInDB(employee: Employee): Promise<void> {
    const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
    expect(dbEmployee).to.deep.equal(employee);
}
