import { PaymentMethod } from "../entities";
import { PaymentMethodRepository } from "../repositories";

interface Dependencies {
    paymentMethodRepository: PaymentMethodRepository;
}

export type SetEmployeePaymentMethodAction = (paymentMethod: PaymentMethod) => Promise<void>;

export function buildSetEmployeePaymentMethodAction({
    paymentMethodRepository
}: Dependencies): SetEmployeePaymentMethodAction {
    return async function(paymentMethod: PaymentMethod): Promise<void> {
        await paymentMethodRepository.deleteByEmployeeId(paymentMethod.employeeId);
        return paymentMethodRepository.insert(paymentMethod);
    };
}
