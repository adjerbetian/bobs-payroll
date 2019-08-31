import { NotFoundError, PaymentMethod, PaymentMethodRepository, PaymentMethodType } from "../../../core";
import { Payment } from "../../entities";
import { PaymentRepository } from "../../repositories";
import { CreatePaymentForEmployee } from "../CreatePaymentForEmployee";

interface Dependencies {
    paymentRepository: PaymentRepository;
    paymentMethodRepository: PaymentMethodRepository;
}

export function buildCreatePaymentForEmployee({
    paymentRepository,
    paymentMethodRepository
}: Dependencies): CreatePaymentForEmployee {
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
