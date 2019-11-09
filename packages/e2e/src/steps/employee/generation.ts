import { CommissionedEmployee, HourlyEmployee, SalariedEmployee } from "@modules/core";
import { generators, seeders } from "@modules/core/test";
import { Given } from "cucumber";
import { store, toFloat } from "../../utils";

Given(
    /^a(?:n)?( new)?(?: hourly)? employee (\w+)(?: with a hourly rate of (\d+\.?\d*))?$/,
    async (isNew: string | null, name: string, hourlyRate: string | null) => {
        const employee = await generateOrSeed();
        store.employees.set(name, employee);

        async function generateOrSeed(): Promise<HourlyEmployee> {
            const partialEmployee = {
                name,
                hourlyRate: toFloat(hourlyRate)
            };
            if (isNew) return generators.generateHourlyEmployee(partialEmployee);
            else return seeders.seedHourlyEmployee(partialEmployee);
        }
    }
);
Given(
    /^a( new)? salaried employee (\w+)(?: with a salary of (\d+\.?\d*))?$/,
    async (isNew: string | null, name: string, salary: string | null) => {
        const employee = await generateOrSeed();
        store.employees.set(name, employee);

        async function generateOrSeed(): Promise<SalariedEmployee> {
            const partialEmployee = {
                name,
                salary: toFloat(salary)
            };
            if (isNew) return generators.generateSalariedEmployee(partialEmployee);
            else return seeders.seedSalariedEmployee(partialEmployee);
        }
    }
);

Given(
    /^a( new)? commissioned employee (\w+)(?: with a salary of (\d+\.?\d*))?(?: and a commission rate of (\d+\.?\d*))?$/,
    async (isNew: string | null, name: string, salary: string | null, commissionRate: string | null) => {
        const employee = await generateOrSeed();
        store.employees.set(name, employee);

        async function generateOrSeed(): Promise<CommissionedEmployee> {
            const partialEmployee = {
                name,
                salary: toFloat(salary),
                commissionRate: toFloat(commissionRate)
            };
            if (isNew) return generators.generateCommissionedEmployee(partialEmployee);
            else return seeders.seedCommissionedEmployee(partialEmployee);
        }
    }
);
