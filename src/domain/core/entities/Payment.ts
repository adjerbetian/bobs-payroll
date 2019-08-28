import { PaymentMethod } from "./PaymentMethod";

export interface Payment {
    employeeId: number;
    amount: number;
    date: Date;
    method: PaymentMethod;
}
