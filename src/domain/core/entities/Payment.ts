import { PaymentMethod } from "./PaymentMethod";

export interface Payment {
    employeeId: number;
    amount: number;
    date: string;
    method: PaymentMethod;
}
