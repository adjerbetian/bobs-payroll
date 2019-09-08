import { CoreDependencies, SalesReceipt } from "../../domain";
import { MongoDbAdapter } from "../databases";

export function makeMongoSalesReceiptRepository(
    db: MongoDbAdapter<SalesReceipt>
): CoreDependencies["salesReceiptRepository"] {
    return {
        async fetchAllOfEmployeeSince(employeeId, date) {
            return db.fetchAll({ employeeId, date: { $gte: date } });
        },
        async insert(salesReceipt) {
            await db.insert(salesReceipt);
        }
    };
}
