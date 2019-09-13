import { CoreDependencies } from "../../domain";
import { MongoDbAdapter } from "../databases";
import { SalesReceiptDBModel } from "../DBModels";
import { salesReceiptMapper } from "../mappers";

export function makeMongoSalesReceiptRepository(
    db: MongoDbAdapter<SalesReceiptDBModel>
): CoreDependencies["salesReceiptRepository"] {
    return {
        async fetchAllOfEmployeeSince(employeeId, date) {
            const models = await db.fetchAll({ employeeId, date: { $gte: date } });
            return salesReceiptMapper.toEntities(models);
        },
        async insert(salesReceipt) {
            await db.insert(salesReceiptMapper.toDBModel(salesReceipt));
        }
    };
}
