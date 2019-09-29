import { expect } from "@test/utils";
import { Then } from "cucumber";
import { dbSalesReceipts } from "../../../app";
import { store } from "../../utils";

Then("{string} should have the sales receipt {string}", async (employeeName: string, salesReceiptName: string) => {
    const employee = store.employees.get(employeeName);
    const salesReceipt = store.salesReceipts.get(salesReceiptName);

    const salesReceiptsInDB = await dbSalesReceipts.fetchAll({ employeeId: employee.getId() });
    expect(salesReceiptsInDB).entities.to.include(salesReceipt);
});
Then("{string} should not have the sales receipt {string}", async (employeeName: string, salesReceiptName: string) => {
    const employee = store.employees.get(employeeName);
    const salesReceipt = store.salesReceipts.get(salesReceiptName);

    const salesReceiptsInDB = await dbSalesReceipts.fetchAll({ employeeId: employee.getId() });
    expect(salesReceiptsInDB).entities.not.to.include(salesReceipt);
});
