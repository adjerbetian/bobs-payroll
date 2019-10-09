import { MongoModel } from "@payroll/mongo";
import { PaymentMethodType } from "@payroll/core";

export interface PaymentDBModel extends MongoModel {
    employeeId: number;
    amount: number;
    date: string;
    method: HoldPaymentMethodDBModel | DirectPaymentMethodDBModel | MailPaymentMethodDBModel;
}

export interface HoldPaymentMethodDBModel {
    type: PaymentMethodType.HOLD;
}

export interface DirectPaymentMethodDBModel {
    type: PaymentMethodType.DIRECT;
    bank: string;
    account: string;
}

export interface MailPaymentMethodDBModel {
    type: PaymentMethodType.MAIL;
    address: string;
}
