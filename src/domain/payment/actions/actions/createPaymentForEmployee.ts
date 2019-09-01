import { CoreActions, NotFoundError, PaymentMethod, PaymentMethodType } from "../../../core";
import { Payment } from "../../entities";
import { PaymentRepository } from "../../repositories";
import { CreatePaymentForEmployee } from "../CreatePaymentForEmployee";

interface Dependencies {
    coreActions: CoreActions;
    paymentRepository: PaymentRepository;
}

export function buildCreatePaymentForEmployee({
    coreActions,
    paymentRepository
}: Dependencies): CreatePaymentForEmployee {
    return async function(basicPayment: Omit<Payment, "method">): Promise<void> {
        const method = await fetchEmployeePaymentMethod(basicPayment.employeeId);
        await paymentRepository.insert({ ...basicPayment, method });
    };

    async function fetchEmployeePaymentMethod(employeeId: number): Promise<PaymentMethod> {
        try {
            return await coreActions.fetchEmployeePaymentMethod(employeeId);
        } catch (err) {
            if (err instanceof NotFoundError) {
                return { type: PaymentMethodType.HOLD, employeeId };
            }
            throw err;
        }
    }
}
