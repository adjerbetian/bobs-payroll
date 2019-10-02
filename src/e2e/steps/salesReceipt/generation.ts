import { generators, seeders } from "@test/generators";
import { Given } from "cucumber";
import { SalesReceipt } from "../../../app";
import { store } from "../../utils";

Given(
    /a( new) sales receipt (\w+) for (\w+)/,
    async (isNew: string | undefined, salesReceiptName: string, employeeName: string) => {
        const salesReceipt = await generateOrSeed();
        store.salesReceipts.set(salesReceiptName, salesReceipt);

        async function generateOrSeed(): Promise<SalesReceipt> {
            const employee = store.employees.get(employeeName);
            const partialSalesReceipt = { employeeId: employee.getId() };

            if (isNew) return generators.generateSalesReceipt(partialSalesReceipt);
            else return seeders.seedSalesReceipt(partialSalesReceipt);
        }
    }
);
