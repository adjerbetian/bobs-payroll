import {
    buildDirectPaymentMethod,
    buildHoldPaymentMethod,
    buildMailPaymentMethod,
    DirectPaymentMethod,
    HoldPaymentMethod,
    MailPaymentMethod,
    PaymentMethod,
    PaymentMethodType
} from "../../domain";
import { PaymentMethodDBModel } from "../DBModels";
import { buildMapper, Mapper } from "./mapper";

type PaymentMethodMapper = Mapper<HoldPaymentMethod> &
    Mapper<DirectPaymentMethod> &
    Mapper<MailPaymentMethod> &
    Mapper<PaymentMethod>;

export const paymentMethodMapper: PaymentMethodMapper = buildMapper({
    toEntity(model: PaymentMethodDBModel): any {
        if (model.type === PaymentMethodType.HOLD) {
            return buildHoldPaymentMethod(model);
        }
        if (model.type === PaymentMethodType.DIRECT) {
            return buildDirectPaymentMethod(model);
        }
        if (model.type === PaymentMethodType.MAIL) {
            return buildMailPaymentMethod(model);
        }
        throw new Error(`unknown type for payment method: ${model}`);
    },
    toDBModel(entity: PaymentMethod): any {
        if (entity.hasType(PaymentMethodType.HOLD)) {
            return {
                employeeId: entity.getEmployeeId(),
                type: entity.getType()
            };
        }
        if (entity.hasType(PaymentMethodType.DIRECT)) {
            return {
                employeeId: entity.getEmployeeId(),
                type: entity.getType(),
                account: entity.getAccount(),
                bank: entity.getBank()
            };
        }
        if (entity.hasType(PaymentMethodType.MAIL)) {
            return {
                employeeId: entity.getEmployeeId(),
                type: entity.getType(),
                address: entity.getAddress()
            };
        }
        throw new Error(`unknown type for payment method entity`);
    }
});
