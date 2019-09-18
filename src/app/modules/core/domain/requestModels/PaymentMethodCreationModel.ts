import { PaymentMethodType } from "../entities";

export type PaymentMethodCreationModel =
    | HoldPaymentMethodCreationModel
    | DirectPaymentMethodCreationModel
    | MailPaymentMethodCreationModel;

export interface HoldPaymentMethodCreationModel extends CommonPaymentMethodCreationModel {
    type: PaymentMethodType.HOLD;
}
export interface DirectPaymentMethodCreationModel extends CommonPaymentMethodCreationModel {
    type: PaymentMethodType.DIRECT;
    bank: string;
    account: string;
}
export interface MailPaymentMethodCreationModel extends CommonPaymentMethodCreationModel {
    type: PaymentMethodType.MAIL;
    address: string;
}

interface CommonPaymentMethodCreationModel {
    employeeId: number;
    type: PaymentMethodType;
}
