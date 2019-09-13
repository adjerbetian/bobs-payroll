import { CoreActions } from "../../../core";
import { buildPayment } from "../../entities";
import { PaymentRepository } from "../../repositories";

interface Dependencies {
    coreActions: CoreActions;
    paymentRepository: PaymentRepository;
}

export type CreatePaymentForEmployee = (basicPayment: {
    employeeId: number;
    date: string;
    amount: number;
}) => Promise<void>;

export function makeCreatePaymentForEmployee({
    coreActions,
    paymentRepository
}: Dependencies): CreatePaymentForEmployee {
    return async function({ employeeId, amount, date }) {
        const method = await coreActions.fetchEmployeePaymentMethod(employeeId);
        const payment = buildPayment({ employeeId, amount, date, method });
        await paymentRepository.insert(payment);
    };
}
