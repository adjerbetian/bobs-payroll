import { CoreDependencies, SalesReceipt } from "../../domain";
import { MongoEntity } from "../databases";
import { SalesReceiptDBModel } from "../DBModels";

export function makeMongoSalesReceiptRepository(
    db: MongoEntity<SalesReceipt, SalesReceiptDBModel>
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
