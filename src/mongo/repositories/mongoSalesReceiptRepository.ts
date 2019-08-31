import { CoreActionsDependencies, SalesReceipt } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";

export function buildMongoSalesReceiptRepository(
    db: MongoDbAdapter<SalesReceipt>
): CoreActionsDependencies["salesReceiptRepository"] {
    return {
        async fetchAllOfEmployee(employeeId: number): Promise<SalesReceipt[]> {
            return db.fetchAll({ employeeId });
        },
        async insert(salesReceipt: SalesReceipt): Promise<void> {
            await db.insert(salesReceipt);
        }
    };
}
