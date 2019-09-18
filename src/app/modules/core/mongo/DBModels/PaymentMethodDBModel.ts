import { MongoModel } from "../../../../mongo";
import { PaymentMethodType } from "../../domain";

export type PaymentMethodDBModel = HoldPaymentMethodDBModel | DirectPaymentMethodDBModel | MailPaymentMethodDBModel;

interface CommonPaymentMethodDBModel extends MongoModel {
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
