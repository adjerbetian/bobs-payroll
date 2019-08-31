import { PaymentMethod } from "../../core";

export interface Payment {
    employeeId: number;
    amount: number;
    date: string;
    method: PaymentMethod;
}
