import { Entity } from "./Entity";

export type PaymentMethod = HoldPaymentMethod | DirectPaymentMethod | MailPaymentMethod;

export interface HoldPaymentMethod extends CommonPaymentMethod {
    getType(): PaymentMethodType.HOLD;
}

export interface DirectPaymentMethod extends CommonPaymentMethod {
    getType(): PaymentMethodType.DIRECT;
    getBank(): string;
    getAccount(): string;
}

export interface MailPaymentMethod extends CommonPaymentMethod {
    getType(): PaymentMethodType.MAIL;
    getAddress(): string;
}

interface CommonPaymentMethod extends Entity {
    getEmployeeId(): number;
    getType(): PaymentMethodType;
    hasType(type: PaymentMethodType.HOLD): this is HoldPaymentMethod;
    hasType(type: PaymentMethodType.DIRECT): this is DirectPaymentMethod;
    hasType(type: PaymentMethodType.MAIL): this is MailPaymentMethod;
}

export enum PaymentMethodType {
    HOLD = "hold-paycheck",
    DIRECT = "direct-deposit",
    MAIL = "mail-paycheck"
}

export function buildHoldPaymentMethod({ employeeId }: { employeeId: number }): HoldPaymentMethod {
    return Object.freeze({
        getEmployeeId() {
            return employeeId;
        },
        getType() {
            return PaymentMethodType.HOLD;
        },
        hasType(type: PaymentMethodType) {
            return type === PaymentMethodType.HOLD;
        },
        toJSON() {
            return {
                entity: "HoldPaymentMethod",
                type: PaymentMethodType.HOLD,
                employeeId
            };
        }
    });
}
export function buildDirectPaymentMethod({
    employeeId,
    bank,
    account
}: {
    employeeId: number;
    bank: string;
    account: string;
}): DirectPaymentMethod {
    return Object.freeze({
        getEmployeeId() {
            return employeeId;
        },
        getBank() {
            return bank;
        },
        getAccount() {
            return account;
        },
        getType() {
            return PaymentMethodType.DIRECT;
        },
        hasType(type: PaymentMethodType) {
            return type === PaymentMethodType.DIRECT;
        },
        toJSON() {
            return {
                entity: "DirectPaymentMethod",
                type: PaymentMethodType.DIRECT,
                employeeId,
                bank,
                account
            };
        }
    });
}
export function buildMailPaymentMethod({
    employeeId,
    address
}: {
    employeeId: number;
    address: string;
}): MailPaymentMethod {
    return Object.freeze({
        getEmployeeId() {
            return employeeId;
        },
        getAddress() {
            return address;
        },
        getType() {
            return PaymentMethodType.MAIL;
        },
        hasType(type: PaymentMethodType) {
            return type === PaymentMethodType.MAIL;
        },
        toJSON() {
            return {
                entity: "MailPaymentMethod",
                type: PaymentMethodType.MAIL,
                employeeId,
                address
            };
        }
    });
}
