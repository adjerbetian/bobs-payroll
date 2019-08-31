import { Payment } from "../../../entities";
import { PaymentRepository } from "../../../repositories";
import { CreatePaymentForEmployeeAction } from "../CreatePaymentForEmployeeAction";
import { FetchEmployeePaymentMethodAction } from "../FetchEmployeePaymentMethodAction";

interface Dependencies {
    paymentRepository: PaymentRepository;
    fetchEmployeePaymentMethod: FetchEmployeePaymentMethodAction;
}

export function buildCreatePaymentForEmployee({
    paymentRepository,
    fetchEmployeePaymentMethod
}: Dependencies): CreatePaymentForEmployeeAction {
    return async function(basicPayment: Omit<Payment, "method">): Promise<void> {
        const method = await fetchEmployeePaymentMethod(basicPayment.employeeId);
        await paymentRepository.insert({ ...basicPayment, method });
    };
}
