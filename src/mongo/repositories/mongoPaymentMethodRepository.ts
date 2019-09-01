import { CoreDependencies, PaymentMethod } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";

export function buildMongoPaymentMethodRepository(
    db: MongoDbAdapter<PaymentMethod>
): CoreDependencies["paymentMethodRepository"] {
    return {
        async fetchByEmployeeId(employeeId: number): Promise<PaymentMethod> {
            return db.fetch({ employeeId });
        },
        async deleteByEmployeeId(employeeId: number): Promise<void> {
            await db.removeAll({ employeeId });
        },
        async insert(paymentMethod: PaymentMethod): Promise<void> {
            await db.insert(paymentMethod);
        }
    };
}
