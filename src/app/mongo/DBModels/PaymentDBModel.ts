import { MongoModel } from "./MongoModel";
import { PaymentMethodDBModel } from "./PaymentMethodDBModel";

export interface PaymentDBModel extends MongoModel {
    employeeId: number;
    amount: number;
    date: string;
    method: PaymentMethodDBModel;
}
