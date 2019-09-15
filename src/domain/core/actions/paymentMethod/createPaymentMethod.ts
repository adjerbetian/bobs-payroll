import { PaymentMethodRepository } from "../../repositories";
import { CorePaymentMethodActions } from "../CoreActions";

interface Dependencies {
    paymentMethodRepository: PaymentMethodRepository;
}

export function makeCreatePaymentMethod({
    paymentMethodRepository
}: Dependencies): CorePaymentMethodActions["createPaymentMethod"] {
    return async function(paymentMethod) {
        await paymentMethodRepository.deleteByEmployeeId(paymentMethod.getEmployeeId());
        return paymentMethodRepository.insert(paymentMethod);
    };
}
