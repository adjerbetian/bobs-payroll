import { PaymentMethodDBModel } from "./PaymentMethodDBModel";

export interface PaymentDBModel {
    employeeId: number;
    amount: number;
    date: string;
    method: PaymentMethodDBModel;
}
