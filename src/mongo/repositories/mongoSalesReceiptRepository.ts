import { buildSalesReceipt, CoreDependencies, SalesReceipt } from "../../domain";
import { MongoDbAdapter } from "../databases";
import { SalesReceiptDBModel } from "../DBModels";

export function makeMongoSalesReceiptRepository(
    db: MongoDbAdapter<SalesReceiptDBModel>
): CoreDependencies["salesReceiptRepository"] {
    return {
        async fetchAllOfEmployeeSince(employeeId, date) {
            const models = await db.fetchAll({ employeeId, date: { $gte: date } });
            return toEntities(models);
        },
        async insert(salesReceipt) {
            await db.insert(toDBModel(salesReceipt));
        }
    };
}

export function toDBModel(salesReceipt: SalesReceipt): SalesReceiptDBModel {
    return {
        employeeId: salesReceipt.getEmployeeId(),
        date: salesReceipt.getDate(),
        amount: salesReceipt.getAmount()
    };
}
export function toEntities(salesReceiptDBModels: SalesReceiptDBModel[]): SalesReceipt[] {
    return salesReceiptDBModels.map(model => toEntity(model));
}
export function toEntity(salesReceiptDBModel: SalesReceiptDBModel): SalesReceipt {
    return buildSalesReceipt(salesReceiptDBModel);
}
