import { SalesReceipt } from "@bobs-payroll/modules";
import { generators, seeders } from "@bobs-payroll/modules/test";
import { Given } from "cucumber";
import { dates, store, toFloat } from "../../utils";

Given(
    /^a( new)? sales receipt(?: (\w+)?)? for (\w+)(?: of an amount of (\d+\.?\d*) on(?: the)? (.+))?$/,
    async (
        isNew: string | undefined,
        salesReceiptName: string | undefined,
        employeeName: string,
        amount: string | undefined,
        day: string | undefined
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
                date: day && dates.get(day)
            };

            if (isNew) return generators.generateSalesReceipt(partialSalesReceipt);
            else return seeders.seedSalesReceipt(partialSalesReceipt);
        }
    }
);
