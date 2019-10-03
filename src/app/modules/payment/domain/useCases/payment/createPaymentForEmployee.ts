import { CoreUseCases } from "../../../../core";
import { buildPayment } from "../../entities";
import { PaymentRepository } from "../../repositories";

interface Dependencies {
    coreUseCases: CoreUseCases;
    paymentRepository: PaymentRepository;
}

export type CreatePaymentForEmployee = (basicPayment: {
    employeeId: number;
    date: string;
    amount: number;
}) => Promise<void>;

export function makeCreatePaymentForEmployee({
    coreUseCases,
    paymentRepository
}: Dependencies): CreatePaymentForEmployee {
    return async function({ employeeId, amount, date }) {
        const method = await coreUseCases.fetchEmployeePaymentMethod(employeeId);
        const payment = buildPayment({ employeeId, amount, date, method });
        await paymentRepository.insert(payment);
    };
}
