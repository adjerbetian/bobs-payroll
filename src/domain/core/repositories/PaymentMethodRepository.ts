import { PaymentMethod } from "../entities";

export interface PaymentMethodRepository {
    fetchByEmployeeId(employeeId: number): Promise<PaymentMethod>;
    deleteByEmployeeId(employeeId: number): Promise<void>;
    insertOne(paymentMethod: PaymentMethod): Promise<void>;
}
