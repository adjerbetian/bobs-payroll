import { generators, seeders } from "@test/generators";
import { Given } from "cucumber";
import { Employee } from "../../app";
import { store } from "../utils";

Given("a new {string} employee {string}", function(type: string, name: string) {
    store.employees.set(name, generateEmployee());

    function generateEmployee(): Employee {
        if (type === "hourly") return generators.generateHourlyEmployee({ name: name });
        if (type === "salaried") return generators.generateSalariedEmployee({ name: name });
        if (type === "commissioned") return generators.generateSalariedEmployee({ name: name });
        throw new Error("invalid type");
    }
});

Given("a(n) {string} employee {string}", async function(type: string, name: string) {
    store.employees.set(name, await seedEmployee());

    async function seedEmployee(): Promise<Employee> {
        if (type === "hourly") return seeders.seedHourlyEmployee({ name: name });
        if (type === "salaried") return seeders.seedSalariedEmployee({ name: name });
        if (type === "commissioned") return seeders.seedSalariedEmployee({ name: name });
        throw new Error("invalid type");
    }
});

Given("a new time card {string} for {string}", async function(timeCardName: string, employeeName: string) {
    const employee = store.employees.get(employeeName);
    store.timeCards.set(timeCardName, generators.generateTimeCard({ employeeId: employee.getId() }));
});
