import { MongoEntity } from "@payroll/mongo";
import { CoreDependencies, PaymentMethod } from "../../domain";
import { PaymentMethodDBModel } from "../DBModels";

export function makeMongoPaymentMethodRepository(
    db: MongoEntity<PaymentMethod, PaymentMethodDBModel>
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
