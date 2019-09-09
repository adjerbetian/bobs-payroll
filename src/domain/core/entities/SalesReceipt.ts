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
    return {
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
                employeeId,
                date,
                amount
            };
        }
    };
}
