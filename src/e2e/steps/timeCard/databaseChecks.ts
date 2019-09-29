import { expect } from "@test/utils";
import { Then } from "cucumber";
import { dbTimeCards } from "../../../app";
import { store } from "../../utils";

Then("{string} should have the time card {string}", async (employeeName: string, timeCardName: string) => {
    const employee = store.employees.get(employeeName);
    const timeCard = store.timeCards.get(timeCardName);

    const timeCardsInDB = await dbTimeCards.fetchAll({ employeeId: employee.getId() });
    expect(timeCardsInDB).entities.to.include(timeCard);
});
Then("{string} should not have the time card {string}", async (employeeName: string, timeCardName: string) => {
    const employee = store.employees.get(employeeName);
    const timeCard = store.timeCards.get(timeCardName);

    const timeCardsInDB = await dbTimeCards.fetchAll({ employeeId: employee.getId() });
    expect(timeCardsInDB).entities.not.to.include(timeCard);
});
