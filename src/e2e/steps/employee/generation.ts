import { generators, seeders } from "@test/generators";
import { Given } from "cucumber";
import { Employee } from "../../../app";
import { store } from "../../utils";

Given("a new {string} employee {string}", (type: string, name: string) => {
    store.employees.set(name, generateEmployee());

    function generateEmployee(): Employee {
        if (type === "hourly") return generators.generateHourlyEmployee({ name: name });
        if (type === "salaried") return generators.generateSalariedEmployee({ name: name });
        if (type === "commissioned") return generators.generateSalariedEmployee({ name: name });
        throw new Error("invalid type");
    }
});
Given("a(n) {string} employee {string}", async (type: string, name: string) => {
    store.employees.set(name, await seedEmployee());

    async function seedEmployee(): Promise<Employee> {
        if (type === "hourly") return seeders.seedHourlyEmployee({ name: name });
        if (type === "salaried") return seeders.seedSalariedEmployee({ name: name });
        if (type === "commissioned") return seeders.seedCommissionedEmployee({ name: name });
        throw new Error("invalid type");
    }
});
Given("an(other) employee {string}", async (name: string) => {
    store.employees.set(name, await seeders.seedHourlyEmployee({ name: name }));
});
Given("a new employee {string}", (name: string) => {
    store.employees.set(name, generators.generateHourlyEmployee({ name: name }));
});
Given("an(other) hourly employee {string} with a hourly rate of {float}", async (name: string, hourlyRate: number) => {
    const employee = await seeders.seedHourlyEmployee({ name: name, hourlyRate });
    store.employees.set(name, employee);
});
// noinspection SpellCheckingInspection
Given("a(nother) salaried employee {string} with a salary of {float}", async (name: string, salary: number) => {
    const employee = await seeders.seedSalariedEmployee({ name: name, salary });
    store.employees.set(name, employee);
});
