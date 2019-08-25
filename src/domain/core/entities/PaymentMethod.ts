export type PaymentMethod = HoldPaymentMethod | DirectPaymentMethod | MailPaymentMethod;

export interface HoldPaymentMethod extends CommonPaymentMethod {
    type: PaymentMethodType.HOLD;
}

export interface DirectPaymentMethod extends CommonPaymentMethod {
    type: PaymentMethodType.DIRECT;
    bank: string;
    account: string;
}

export interface MailPaymentMethod extends CommonPaymentMethod {
    type: PaymentMethodType.MAIL;
    address: string;
}

interface CommonPaymentMethod {
    employeeId: number;
    type: PaymentMethodType;
}

export enum PaymentMethodType {
    HOLD = "hold-paycheck",
    DIRECT = "direct-deposit",
    MAIL = "mail-paycheck"
}
