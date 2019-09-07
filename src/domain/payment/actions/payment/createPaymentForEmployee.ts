import { CoreActions } from "../../../core";
import { Payment } from "../../entities";
import { PaymentRepository } from "../../repositories";

interface Dependencies {
    coreActions: CoreActions;
    paymentRepository: PaymentRepository;
}

export type CreatePaymentForEmployee = (basicPayment: Omit<Payment, "method">) => Promise<void>;

export function makeCreatePaymentForEmployee({
    coreActions,
    paymentRepository
}: Dependencies): CreatePaymentForEmployee {
    return async function(basicPayment: Omit<Payment, "method">): Promise<void> {
        const method = await coreActions.fetchEmployeePaymentMethod(basicPayment.employeeId);
        await paymentRepository.insert({ ...basicPayment, method });
    };
}
