import { expect } from "@test/utils";
import { Then } from "cucumber";
import { dbEmployees, dbTimeCards } from "../../app";
import { store } from "../utils";

Then("{string} should fully exist in the employee DB", async function(name: string) {
    const employee = store.employees.get(name);
    const dbEmployee = await dbEmployees.fetch({ id: employee.getId() });
    expect(dbEmployee).entity.to.equal(employee);
});

Then("{string} should not exist in the employee DB", async function(name: string) {
    const employee = store.employees.get(name);
    const employeeExistsInDb = await dbEmployees.exists({ id: employee.getId() });
    expect(employeeExistsInDb).to.be.false;
});

Then("{string} should (still) exist in the employee DB", async function(name: string) {
    const employee = store.employees.get(name);
    const employeeExistsInDb = await dbEmployees.exists({ id: employee.getId() });
    expect(employeeExistsInDb).to.be.true;
});

Then("{string} should have the time card {string}", async function(employeeName: string, timeCardName: string) {
    const employee = store.employees.get(employeeName);
    const timeCard = store.timeCards.get(timeCardName);

    const timeCardsInDB = await dbTimeCards.fetchAll({ employeeId: employee.getId() });
    expect(timeCardsInDB).entities.to.include(timeCard);
});

Then("{string} should not have the time card {string}", async function(employeeName: string, timeCardName: string) {
    const employee = store.employees.get(employeeName);
    const timeCard = store.timeCards.get(timeCardName);

    const timeCardsInDB = await dbTimeCards.fetchAll({ employeeId: employee.getId() });
    expect(timeCardsInDB).entities.not.to.include(timeCard);
});
