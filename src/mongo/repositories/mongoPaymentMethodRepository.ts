import { CoreDependencies } from "../../domain";
import { MongoDbAdapter } from "../databases";
import { PaymentMethodDBModel } from "../DBModels";
import { paymentMethodMapper } from "../mappers";

export function makeMongoPaymentMethodRepository(
    db: MongoDbAdapter<PaymentMethodDBModel>
): CoreDependencies["paymentMethodRepository"] {
    return {
        async fetchByEmployeeId(employeeId) {
            const dbModel = await db.fetch({ employeeId });
            return paymentMethodMapper.toEntity(dbModel);
        },
        async deleteByEmployeeId(employeeId) {
            await db.removeAll({ employeeId });
        },
        async insert(paymentMethod) {
            await db.insert(paymentMethodMapper.toDBModel(paymentMethod));
        }
    };
}
