import { SalesReceipt, SalesReceiptRepository } from "../domain";
import { dbSalesReceipts } from "./db";

export const mongoSalesReceiptRepository: SalesReceiptRepository = {
    async fetchAllOfEmployee(employeeId: number): Promise<SalesReceipt[]> {
        return dbSalesReceipts.fetchAll({ employeeId });
    },
    async insertOne(salesReceipt: SalesReceipt): Promise<void> {
        await dbSalesReceipts.insert(salesReceipt);
    }
};
