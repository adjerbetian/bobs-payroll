import { expect } from "@test/utils";
import { Then } from "cucumber";
import { dbEmployees, dbTimeCards } from "../../app";
import { store } from "../utils";

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

Then("the employee should have the time card", async function() {
    const timeCards = await dbTimeCards.fetchAll({ employeeId: store.employee.getId() });
    expect(timeCards).entities.to.include(store.timeCard);
});
