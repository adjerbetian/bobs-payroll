import { CoreDependencies, SalesReceipt } from "../../domain";
import { MongoEntity } from "../databases";

export function makeMongoSalesReceiptRepository(
    db: MongoEntity<SalesReceipt>
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
