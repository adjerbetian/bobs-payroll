import { SalesReceiptRepository } from "../repositories";
import { SalesReceipt } from "../entities";
import { dbSalesReceipt } from "./db";
import { cleanMongoEntity } from "./utils";

export const salesReceiptRepository: SalesReceiptRepository = {
    async fetchAllOfEmployee(employeeId: number): Promise<SalesReceipt[]> {
        const salesReceipts = await dbSalesReceipt.find({ employeeId }).toArray();
        return salesReceipts.map(e => cleanMongoEntity(e));
    }
};
