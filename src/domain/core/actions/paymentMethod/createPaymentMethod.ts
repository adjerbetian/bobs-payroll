import { PaymentMethod } from "../../entities";
import { PaymentMethodRepository } from "../../repositories";
import { CorePaymentMethodActions } from "../CoreActions";

interface Dependencies {
    paymentMethodRepository: PaymentMethodRepository;
}

export function buildCreatePaymentMethod({
    paymentMethodRepository
}: Dependencies): CorePaymentMethodActions["createPaymentMethod"] {
    return async function(paymentMethod: PaymentMethod): Promise<void> {
        await paymentMethodRepository.deleteByEmployeeId(paymentMethod.employeeId);
        return paymentMethodRepository.insert(paymentMethod);
    };
}