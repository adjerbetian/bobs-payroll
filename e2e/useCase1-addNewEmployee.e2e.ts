import {
    executePayrollCommand,
    expect,
    generateCommissionedEmployee,
    generateHourlyEmployee,
    generateSalariedEmployee
} from "@test/e2e";
import { dbEmployees, Employee } from "../src";

describe("Use Case 1: Add New Employee", () => {
    it("should add an hourly employee", async () => {
        const employee = generateHourlyEmployee();

        await executePayrollCommand(
            `AddEmp ${employee.id} "${employee.name}" "${employee.address}" H ${employee.work.hourlyRate}`
        );

        await expectUserToExistInDb(employee);
    });
    it("should add a salaried employee", async () => {
        const employee = generateSalariedEmployee();

        await executePayrollCommand(
            `AddEmp ${employee.id} "${employee.name}" "${employee.address}" S ${employee.work.monthlySalary}`
        );

        await expectUserToExistInDb(employee);
    });
    it("should add a salaried employee with a monthly commission rate", async () => {
        const employee = generateCommissionedEmployee();

        await executePayrollCommand(
            `AddEmp ${employee.id} "${employee.name}" "${employee.address}" C ${employee.work.monthlySalary} ${employee.work.commissionRate}`
        );

        await expectUserToExistInDb(employee);
    });
    it("should do nothing when the transaction is wrongly put", async () => {
        const employee = generateCommissionedEmployee();

        await executePayrollCommand(
            `AddEmp ${employee.id} "${employee.name}" "${employee.address}" C ${employee.work.monthlySalary}`
        );

        const employeeExistsInDb = await dbEmployees.exists({ id: employee.id });
        expect(employeeExistsInDb).to.be.false;
    });
});

async function expectUserToExistInDb(employee: Employee): Promise<void> {
    const dbEmployee = await dbEmployees.fetch({ id: employee.id });
    expect(dbEmployee).to.deep.equal(employee);
}
