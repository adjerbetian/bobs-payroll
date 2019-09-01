import { CoreDependencies, SalesReceipt } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";

export function buildMongoSalesReceiptRepository(
    db: MongoDbAdapter<SalesReceipt>
): CoreDependencies["salesReceiptRepository"] {
    return {
        async fetchAllOfEmployee(employeeId: number): Promise<SalesReceipt[]> {
            return db.fetchAll({ employeeId });
        },
        async insert(salesReceipt: SalesReceipt): Promise<void> {
            await db.insert(salesReceipt);
        }
    };
}
