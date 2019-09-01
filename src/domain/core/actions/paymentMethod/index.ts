import { PaymentMethodRepository } from "../../repositories";
import { CorePaymentMethodActions } from "../CoreActions";
import { buildSetEmployeePaymentMethod } from "./setEmployeePaymentMethod";

interface Dependencies {
    paymentMethodRepository: PaymentMethodRepository;
}

export function buildCorePaymentMethodActions({ paymentMethodRepository }: Dependencies): CorePaymentMethodActions {
    return {
        setEmployeePaymentMethod: buildSetEmployeePaymentMethod({ paymentMethodRepository })
    };
}
export { CorePaymentMethodActions } from "../CoreActions";
