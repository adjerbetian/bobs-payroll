import { CoreDependencies, PaymentMethod } from "../../domain";
import { MongoDbAdapter } from "../databases";

export function makeMongoPaymentMethodRepository(
    db: MongoDbAdapter<PaymentMethod>
): CoreDependencies["paymentMethodRepository"] {
    return {
        async fetchByEmployeeId(employeeId) {
            return db.fetch({ employeeId });
        },
        async deleteByEmployeeId(employeeId) {
            await db.removeAll({ employeeId });
        },
        async insert(paymentMethod) {
            await db.insert(paymentMethod);
        }
    };
}
