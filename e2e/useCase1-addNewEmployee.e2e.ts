import { dbModelGenerators, executePayrollCommand, expect } from "@test/e2e";
import { dbEmployees, EmployeeDBModel } from "../src";

describe("Use Case 1: Add New Employee", () => {
    it("should add an hourly employee", async () => {
        const employee = dbModelGenerators.generateHourlyEmployee();

        await executePayrollCommand(
            `AddEmp ${employee.id} "${employee.name}" "${employee.address}" H ${employee.hourlyRate}`
        );

        await expectUserToExistInDb(employee);
    });
    it("should add a salaried employee", async () => {
        const employee = dbModelGenerators.generateSalariedEmployee();

        await executePayrollCommand(
            `AddEmp ${employee.id} "${employee.name}" "${employee.address}" S ${employee.salary}`
        );

        await expectUserToExistInDb(employee);
    });
    it("should add a salaried employee with a monthly commission rate", async () => {
        const employee = dbModelGenerators.generateCommissionedEmployee();

        await executePayrollCommand(
            `AddEmp ${employee.id} "${employee.name}" "${employee.address}" C ${employee.salary} ${employee.commissionRate}`
        );

        await expectUserToExistInDb(employee);
    });
    it("should do nothing when the transaction is wrongly put", async () => {
        const employee = dbModelGenerators.generateCommissionedEmployee();

        await executePayrollCommand(
            `AddEmp ${employee.id} "${employee.name}" "${employee.address}" C ${employee.salary}`
        );

        const employeeExistsInDb = await dbEmployees.exists({ id: employee.id });
        expect(employeeExistsInDb).to.be.false;
    });
});

async function expectUserToExistInDb(employee: EmployeeDBModel): Promise<void> {
    const dbEmployee = await dbEmployees.fetch({ id: employee.id });
    expect(dbEmployee).to.deep.equal(employee);
}
