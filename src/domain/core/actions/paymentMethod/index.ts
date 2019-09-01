import { PaymentMethodRepository } from "../../repositories";
import { CorePaymentMethodActions } from "./CorePaymentMethodActions";
import { buildSetEmployeePaymentMethod } from "./setEmployeePaymentMethod";

export { CorePaymentMethodActions } from "./CorePaymentMethodActions";

interface Dependencies {
    paymentMethodRepository: PaymentMethodRepository;
}

export function buildCorePaymentMethodActions({ paymentMethodRepository }: Dependencies): CorePaymentMethodActions {
    return {
        setEmployeePaymentMethod: buildSetEmployeePaymentMethod({ paymentMethodRepository })
    };
}
