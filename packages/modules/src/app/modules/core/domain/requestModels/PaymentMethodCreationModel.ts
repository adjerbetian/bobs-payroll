import { PaymentMethodType } from "../entities";

export type PaymentMethodCreationModel =
    | HoldPaymentMethodCreationModel
    | DirectPaymentMethodCreationModel
    | MailPaymentMethodCreationModel;

export interface HoldPaymentMethodCreationModel extends CommonPaymentMethodCreationModel {
    readonly type: PaymentMethodType.HOLD;
}
export interface DirectPaymentMethodCreationModel extends CommonPaymentMethodCreationModel {
    readonly type: PaymentMethodType.DIRECT;
    readonly bank: string;
    readonly account: string;
}
export interface MailPaymentMethodCreationModel extends CommonPaymentMethodCreationModel {
    readonly type: PaymentMethodType.MAIL;
    readonly address: string;
}

interface CommonPaymentMethodCreationModel {
    readonly employeeId: number;
    readonly type: PaymentMethodType;
}
