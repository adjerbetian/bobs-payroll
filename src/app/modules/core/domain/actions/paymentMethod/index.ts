import { PaymentMethodRepository } from "../../repositories";
import { CorePaymentMethodActions } from "../CoreActions";
import { makeCreatePaymentMethod } from "./createPaymentMethod";
import { makeFetchEmployeePaymentMethod } from "./fetchEmployeePaymentMethod";

interface Dependencies {
    paymentMethodRepository: PaymentMethodRepository;
}

export function makeCorePaymentMethodActions({ paymentMethodRepository }: Dependencies): CorePaymentMethodActions {
    return {
        createPaymentMethod: makeCreatePaymentMethod({ paymentMethodRepository }),
        fetchEmployeePaymentMethod: makeFetchEmployeePaymentMethod({ paymentMethodRepository })
    };
}
export { CorePaymentMethodActions } from "../CoreActions";
