import { Entity } from "./Entity";

export interface SalesReceipt extends Entity {
    getEmployeeId(): number;
    getDate(): string;
    getAmount(): number;
}

export function buildSalesReceipt({
    employeeId,
    date,
    amount
}: {
    employeeId: number;
    date: string;
    amount: number;
}): SalesReceipt {
    return Object.freeze({
        getEmployeeId() {
            return employeeId;
        },
        getDate() {
            return date;
        },
        getAmount() {
            return amount;
        },
        toJSON() {
            return {
                entity: "SalesReceipt",
                employeeId,
                date,
                amount
            };
        }
    });
}
