import { executePayrollCommand } from "@test/cucumber";
import { When } from "cucumber";
import { store } from "../../utils";

When("I execute the SalesReceipt command on {string}", async (name: string) => {
    const salesReceipt = store.salesReceipts.get(name);
    await executePayrollCommand(
        `SalesReceipt ${salesReceipt.getEmployeeId()} ${salesReceipt.getDate()} ${salesReceipt.getAmount()}`
    );
});
When("I execute an incomplete SalesReceipt command on {string}", async (name: string) => {
    const salesReceipt = store.salesReceipts.get(name);
    await executePayrollCommand(`SalesReceipt ${salesReceipt.getEmployeeId()} ${salesReceipt.getDate()}`);
});
