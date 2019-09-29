import { generators, executePayrollCommand, expect } from "@test/e2e";
import { dbEmployees, Employee } from "../app";

// --------------------------
// DEPRECATED
// --------------------------

describe("Use Case 1: Add New Employee", () => {
    it("should add an hourly employee", async () => {
        const employee = generators.generateHourlyEmployee();

        await executePayrollCommand(
            `AddEmp ${employee.getId()} "${employee.getName()}" "${employee.getAddress()}" H ${employee.getHourlyRate()}`
        );

        await expectUserToExistInDb(employee);
    });
    it("should add a salaried employee", async () => {
        const employee = generators.generateSalariedEmployee();

        await executePayrollCommand(
            `AddEmp ${employee.getId()} "${employee.getName()}" "${employee.getAddress()}" S ${employee.getSalary()}`
        );

        await expectUserToExistInDb(employee);
    });
    it("should add a salaried employee with a monthly commission rate", async () => {
        const employee = generators.generateCommissionedEmployee();

        await executePayrollCommand(
            `AddEmp ${employee.getId()} "${employee.getName()}" "${employee.getAddress()}" C ${employee.getSalary()} ${employee.getCommissionRate()}`
        );

        await expectUserToExistInDb(employee);
    });
    it("should do nothing when the transaction is wrongly put", async () => {
        const employee = generators.generateCommissionedEmployee();

        await executePayrollCommand(
            `AddEmp ${employee.getId()} "${employee.getName()}" "${employee.getAddress()}" C ${employee.getSalary()}`
        );

        const employeeExistsInDb = await dbEmployees.exists({ id: employee.getId() });
        expect(employeeExistsInDb).to.be.false;
    });
});

async function expectUserToExistInDb(employee: Employee): Promise<void> {
    const dbEmployee = await dbEmployees.fetch({ id: employee.getId() });
    expect(dbEmployee).entity.to.equal(employee);
}
