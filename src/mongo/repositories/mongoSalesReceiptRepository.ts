import { CoreDependencies, SalesReceipt } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";

export function makeMongoSalesReceiptRepository(
    db: MongoDbAdapter<SalesReceipt>
): CoreDependencies["salesReceiptRepository"] {
    return {
        async fetchAllOfEmployeeSince(employeeId: number, date: string): Promise<SalesReceipt[]> {
            return db.fetchAll({ employeeId, date: { $gte: date } });
        },
        async insert(salesReceipt: SalesReceipt): Promise<void> {
            await db.insert(salesReceipt);
        }
    };
}
