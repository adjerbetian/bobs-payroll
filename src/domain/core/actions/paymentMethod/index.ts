import { PaymentMethodRepository } from "../../repositories";
import { CorePaymentMethodActions } from "../CoreActions";
import { buildCreatePaymentMethod } from "./createPaymentMethod";
import { buildFetchEmployeePaymentMethod } from "./fetchEmployeePaymentMethod";

interface Dependencies {
    paymentMethodRepository: PaymentMethodRepository;
}

export function buildCorePaymentMethodActions({ paymentMethodRepository }: Dependencies): CorePaymentMethodActions {
    return {
        createPaymentMethod: buildCreatePaymentMethod({ paymentMethodRepository }),
        fetchEmployeePaymentMethod: buildFetchEmployeePaymentMethod({ paymentMethodRepository })
    };
}
export { CorePaymentMethodActions } from "../CoreActions";
