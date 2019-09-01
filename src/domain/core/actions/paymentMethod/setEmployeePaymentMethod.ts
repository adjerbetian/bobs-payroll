import { PaymentMethod } from "../../entities";
import { PaymentMethodRepository } from "../../repositories";

interface Dependencies {
    paymentMethodRepository: PaymentMethodRepository;
}

export type SetEmployeePaymentMethod = (paymentMethod: PaymentMethod) => Promise<void>;

export function buildSetEmployeePaymentMethod({ paymentMethodRepository }: Dependencies): SetEmployeePaymentMethod {
    return async function(paymentMethod: PaymentMethod): Promise<void> {
        await paymentMethodRepository.deleteByEmployeeId(paymentMethod.employeeId);
        return paymentMethodRepository.insert(paymentMethod);
    };
}
