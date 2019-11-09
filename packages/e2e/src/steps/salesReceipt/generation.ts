import { SalesReceipt } from "@modules/core";
import { generators, seeders } from "@modules/core/test";
import { Given } from "cucumber";
import { dates, store, toFloat } from "../../utils";

Given(
    /^a( new)? sales receipt(?: (\w+)?)? for (\w+)(?: of an amount of (\d+\.?\d*) on(?: the)? (.+))?$/,
    async (
        isNew: string | null,
        salesReceiptName: string | null,
        employeeName: string,
        amount: string | null,
        day: string | null
    ) => {
        const salesReceipt = await generateOrSeed();
        if (salesReceiptName) {
            store.salesReceipts.set(salesReceiptName, salesReceipt);
        }

        async function generateOrSeed(): Promise<SalesReceipt> {
            const employee = store.employees.get(employeeName);
            const partialSalesReceipt = {
                employeeId: employee.getId(),
                amount: toFloat(amount),
                date: (day && dates.get(day)) || undefined
            };

            if (isNew) return generators.generateSalesReceipt(partialSalesReceipt);
            else return seeders.seedSalesReceipt(partialSalesReceipt);
        }
    }
);
