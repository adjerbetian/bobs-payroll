import { PaymentMethod } from "../domain";

export const mongoPaymentMethodRepository = {
    async fetchByEmployeeId(employeeId: number): Promise<void> {
        return;
    },
    async insertOne(paymentMethod: PaymentMethod): Promise<void> {
        return;
    }
};
