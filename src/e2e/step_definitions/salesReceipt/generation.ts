import { generators, seeders } from "@test/generators";
import { Given } from "cucumber";
import { store } from "../../utils";

Given("a new sales receipt {string} for {string}", async (salesReceiptName: string, employeeName: string) => {
    const employee = store.employees.get(employeeName);

    const salesReceipt = generators.generateSalesReceipt({ employeeId: employee.getId() });
    store.salesReceipts.set(salesReceiptName, salesReceipt);
});
Given("a sales receipt {string} for {string}", async (salesReceiptName: string, employeeName: string) => {
    const employee = store.employees.get(employeeName);

    const salesReceipt = await seeders.seedSalesReceipt({ employeeId: employee.getId() });
    store.salesReceipts.set(salesReceiptName, salesReceipt);
});
