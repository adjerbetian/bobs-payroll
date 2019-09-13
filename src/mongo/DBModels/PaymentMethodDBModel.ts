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

export type PaymentMethodDBModel = HoldPaymentMethodDBModel | DirectPaymentMethodDBModel | MailPaymentMethodDBModel;

interface CommonPaymentMethodDBModel {
    employeeId: number;
    type: PaymentMethodType;
}

export interface HoldPaymentMethodDBModel extends CommonPaymentMethodDBModel {
    type: PaymentMethodType.HOLD;
}

export interface DirectPaymentMethodDBModel extends CommonPaymentMethodDBModel {
    type: PaymentMethodType.DIRECT;
    bank: string;
    account: string;
}

export interface MailPaymentMethodDBModel extends CommonPaymentMethodDBModel {
    type: PaymentMethodType.MAIL;
    address: string;
}

interface PaymentMethodMapper {
    toEntity(model: HoldPaymentMethodDBModel): HoldPaymentMethod;
    toEntity(model: DirectPaymentMethodDBModel): DirectPaymentMethod;
    toEntity(model: MailPaymentMethodDBModel): MailPaymentMethod;
    toEntity(model: PaymentMethodDBModel): PaymentMethod;

    toDBModel(entity: HoldPaymentMethod): HoldPaymentMethodDBModel;
    toDBModel(entity: DirectPaymentMethod): DirectPaymentMethodDBModel;
    toDBModel(entity: MailPaymentMethod): MailPaymentMethodDBModel;
    toDBModel(entity: PaymentMethod): PaymentMethodDBModel;
}

export const paymentMethodMapper: PaymentMethodMapper = {
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
};
