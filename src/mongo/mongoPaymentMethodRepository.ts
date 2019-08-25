import { PaymentMethod, PaymentMethodRepository } from "../domain";
import { dbPaymentMethods } from "./db";

export const mongoPaymentMethodRepository: PaymentMethodRepository = {
    async fetchByEmployeeId(employeeId: number): Promise<PaymentMethod> {
        return dbPaymentMethods.fetch({ employeeId });
    },
    async deleteByEmployeeId(employeeId: number): Promise<void> {
        await dbPaymentMethods.removeAll({ employeeId });
    },
    async insertOne(paymentMethod: PaymentMethod): Promise<void> {
        await dbPaymentMethods.insert(paymentMethod);
    }
};
