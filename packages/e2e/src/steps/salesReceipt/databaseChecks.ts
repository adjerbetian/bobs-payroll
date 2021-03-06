import { dbSalesReceipts } from "@modules/core";
import { expect } from "@infra/test";
import { Then } from "cucumber";
import { store } from "../../utils";

// noinspection DuplicatedCode
Then(
    /^(\w+) should( not)? have the sales receipt (\w+)$/,
    async (employeeName: string, isNegated: string | undefined, salesReceiptName: string) => {
        const employee = store.employees.get(employeeName);
        const salesReceipt = store.salesReceipts.get(salesReceiptName);

        const salesReceiptsInDB = await dbSalesReceipts.fetchAll({ employeeId: employee.getId() });
        if (isNegated) {
            expect(salesReceiptsInDB).entities.not.to.include(salesReceipt);
        } else {
            expect(salesReceiptsInDB).entities.to.include(salesReceipt);
        }
    }
);
