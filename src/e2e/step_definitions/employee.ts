import { generators, seeders } from "@test/generators";
import { expect } from "@test/utils";
import { Given, Then } from "cucumber";
import { dbEmployees } from "../../app";
import { store } from "../utils";

Given("a new {string} employee", function(type: string) {
    if (type === "hourly") {
        store.employee = generators.generateHourlyEmployee();
    } else if (type === "salaried") {
        store.employee = generators.generateSalariedEmployee();
    } else if (type === "commissioned") {
        store.employee = generators.generateSalariedEmployee();
    }
});

Given("a(n) {string} employee", async function(type: string) {
    if (type === "hourly") {
        store.employee = await seeders.seedHourlyEmployee();
    } else if (type === "salaried") {
        store.employee = await seeders.seedSalariedEmployee();
    } else if (type === "commissioned") {
        store.employee = await seeders.seedSalariedEmployee();
    }
});

Then("the employee should fully exist in the DB", async function() {
    const employee = store.employee;
    const dbEmployee = await dbEmployees.fetch({ id: employee.getId() });
    expect(dbEmployee).entity.to.equal(employee);
});

Then("the employee should not exist in the DB", async function() {
    const employee = store.employee;
    const employeeExistsInDb = await dbEmployees.exists({ id: employee.getId() });
    expect(employeeExistsInDb).to.be.false;
});

Then("the employee should (still) exist in the DB", async function() {
    const employee = store.employee;
    const employeeExistsInDb = await dbEmployees.exists({ id: employee.getId() });
    expect(employeeExistsInDb).to.be.true;
});
