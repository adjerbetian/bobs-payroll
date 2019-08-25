import { SalesReceipt, SalesReceiptRepository } from "../domain";
import { dbSalesReceipts } from "./db";
import { cleanMongoEntity } from "./utils";

export const mongoSalesReceiptRepository: SalesReceiptRepository = {
    async fetchAllOfEmployee(employeeId: number): Promise<SalesReceipt[]> {
        const salesReceipts = await dbSalesReceipts.find({ employeeId }).toArray();
        return salesReceipts.map(e => cleanMongoEntity(e));
    },
    async insertOne(salesReceipt: SalesReceipt): Promise<void> {
        await dbSalesReceipts.insertOne(salesReceipt);
        cleanMongoEntity(salesReceipt);
    }
};
