import { executePayrollCommand, expect } from "@test/cucumber";
import { generators } from "@test/generators";
import { Given, Then, When } from "cucumber";
import { dbEmployees, Employee, EmployeeType } from "../../app";

let employee: Employee;

Given("a(n) {string} employee", function(type: string) {
    if (type === "hourly") {
        employee = generators.generateHourlyEmployee();
    } else if (type === "salaried") {
        employee = generators.generateSalariedEmployee();
    } else if (type === "commissioned") {
        employee = generators.generateSalariedEmployee();
    }
});

When("I execute the AddEmp command", async function() {
    await executePayrollCommand(buildCommand());

    function buildCommand(): string {
        if (employee.hasType(EmployeeType.HOURLY)) {
            return `AddEmp ${employee.getId()} "${employee.getName()}" "${employee.getAddress()}" H ${employee.getHourlyRate()}`;
        }
        if (employee.hasType(EmployeeType.SALARIED)) {
            return `AddEmp ${employee.getId()} "${employee.getName()}" "${employee.getAddress()}" S ${employee.getSalary()}`;
        }
        if (employee.hasType(EmployeeType.COMMISSIONED)) {
            return `AddEmp ${employee.getId()} "${employee.getName()}" "${employee.getAddress()}" C ${employee.getSalary()} ${employee.getCommissionRate()}`;
        }
        throw new Error("invalid type");
    }
});

When("I execute an incomplete AddEmp command", async function() {
    await executePayrollCommand(`AddEmp ${employee.getId()} "${employee.getName()}" "${employee.getAddress()}"`);
});

Then("the employee should fully exist in the DB", async function() {
    const dbEmployee = await dbEmployees.fetch({ id: employee.getId() });
    expect(dbEmployee).entity.to.equal(employee);
});

Then("the employee should not exist in the DB", async function() {
    const employeeExistsInDb = await dbEmployees.exists({ id: employee.getId() });
    expect(employeeExistsInDb).to.be.false;
});
