import { FilterQuery } from "mongodb";
import { NotFoundError, PaymentMethod, PaymentMethodRepository } from "../domain";
import { dbPaymentMethods } from "./db";
import { cleanMongoEntity } from "./utils";

export const mongoPaymentMethodRepository: PaymentMethodRepository = {
    async fetchByEmployeeId(employeeId: number): Promise<PaymentMethod> {
        return fetchByQuery({ employeeId });
    },
    async deleteByEmployeeId(employeeId: number): Promise<void> {
        await dbPaymentMethods.deleteMany({ employeeId });
    },
    async insertOne(paymentMethod: PaymentMethod): Promise<void> {
        await dbPaymentMethods.insertOne(paymentMethod);
        cleanMongoEntity(paymentMethod);
    }
};

async function fetchByQuery(query: FilterQuery<PaymentMethod>): Promise<PaymentMethod> {
    const paymentMethod = await dbPaymentMethods.findOne(query);
    if (!paymentMethod) {
        throw new NotFoundError(`no payment method matching ${JSON.stringify(query)} was found`);
    }
    return cleanMongoEntity(paymentMethod);
}
