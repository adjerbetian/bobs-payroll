import { generators, seeders } from "@test/generators";
import { Given } from "cucumber";
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

Given("a new time card", async function() {
    store.timeCard = generators.generateTimeCard({ employeeId: store.employee.getId() });
});
