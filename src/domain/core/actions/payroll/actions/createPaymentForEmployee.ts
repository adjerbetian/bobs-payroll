import { Payment, PaymentMethod, PaymentMethodType } from "../../../entities";
import { NotFoundError } from "../../../errors";
import { PaymentMethodRepository, PaymentRepository } from "../../../repositories";
import { CreatePaymentForEmployeeAction } from "../CreatePaymentForEmployeeAction";

interface Dependencies {
    paymentRepository: PaymentRepository;
    paymentMethodRepository: PaymentMethodRepository;
}

export function buildCreatePaymentForEmployee({
    paymentRepository,
    paymentMethodRepository
}: Dependencies): CreatePaymentForEmployeeAction {
    return async function(basicPayment: Omit<Payment, "method">): Promise<void> {
        const method = await fetchEmployeePaymentMethod(basicPayment.employeeId);
        await paymentRepository.insert({ ...basicPayment, method });
    };

    async function fetchEmployeePaymentMethod(employeeId: number): Promise<PaymentMethod> {
        try {
            return await paymentMethodRepository.fetchByEmployeeId(employeeId);
        } catch (err) {
            if (err instanceof NotFoundError) {
                return { type: PaymentMethodType.HOLD, employeeId };
            }
            throw err;
        }
    }
}
