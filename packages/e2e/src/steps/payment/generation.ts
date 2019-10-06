import { seeders } from "@bobs-payroll/modules/test";
import { Given } from "cucumber";
import { dates, store } from "../../utils";

Given(/^a payment for (\w+) on (.+)$/, async (name: string, day: string) => {
    const employee = store.employees.get(name);
    const date = dates.get(day);

    await seeders.seedPayment({ employeeId: employee.getId(), date });
});
