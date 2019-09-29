import { generators, seeders } from "@test/generators";
import { Given } from "cucumber";
import { store } from "../../utils";

Given("a new time card {string} for {string}", async (timeCardName: string, employeeName: string) => {
    const employee = store.employees.get(employeeName);

    const timeCard = generators.generateTimeCard({ employeeId: employee.getId() });
    store.timeCards.set(timeCardName, timeCard);
});
Given("a time card {string} for {string}", async (timeCardName: string, employeeName: string) => {
    const employee = store.employees.get(employeeName);

    const timeCard = await seeders.seedTimeCard({ employeeId: employee.getId() });
    store.timeCards.set(timeCardName, timeCard);
});
