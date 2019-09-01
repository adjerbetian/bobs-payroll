import { PaymentMethodRepository } from "../../repositories";
import { CorePaymentMethodActions } from "../CoreActions";
import { buildCreatePaymentMethod } from "./createPaymentMethod";

interface Dependencies {
    paymentMethodRepository: PaymentMethodRepository;
}

export function buildCorePaymentMethodActions({ paymentMethodRepository }: Dependencies): CorePaymentMethodActions {
    return {
        createPaymentMethod: buildCreatePaymentMethod({ paymentMethodRepository })
    };
}
export { CorePaymentMethodActions } from "../CoreActions";
