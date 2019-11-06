import { Entity, PaymentMethod } from "@modules/core";

export interface Payment extends Entity {
    getEmployeeId(): number;
    getAmount(): number;
    getDate(): string;
    getMethod(): PaymentMethod;
}

export function buildPayment({
    employeeId,
    amount,
    date,
    method
}: {
    employeeId: number;
    amount: number;
    date: string;
    method: PaymentMethod;
}): Payment {
    return Object.freeze({
        getEmployeeId() {
            return employeeId;
        },
        getAmount() {
            return amount;
        },
        getDate() {
            return date;
        },
        getMethod() {
            return method;
        },
        toJSON() {
            return {
                entity: "Payment",
                employeeId,
                amount,
                date,
                method: method.toJSON()
            };
        }
    });
}
