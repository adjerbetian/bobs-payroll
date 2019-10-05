import { buildMapper, Mapper } from "@bobs-payroll/mongo";
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
import {
    DirectPaymentMethodDBModel,
    HoldPaymentMethodDBModel,
    MailPaymentMethodDBModel,
    PaymentMethodDBModel
} from "../DBModels";

// prettier-ignore
type PaymentMethodMapper =
    & Mapper<HoldPaymentMethod, HoldPaymentMethodDBModel>
    & Mapper<DirectPaymentMethod, DirectPaymentMethodDBModel>
    & Mapper<MailPaymentMethod, MailPaymentMethodDBModel>
    & Mapper<PaymentMethod, PaymentMethodDBModel>;

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
