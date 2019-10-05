import { PaymentMethodRepository } from "../../repositories";
import { CorePaymentMethodUseCases } from "../CoreUseCases";
import { makeCreatePaymentMethod } from "./createPaymentMethod";
import { makeFetchEmployeePaymentMethod } from "./fetchEmployeePaymentMethod";

interface Dependencies {
    paymentMethodRepository: PaymentMethodRepository;
}

export function makeCorePaymentMethodUseCases({ paymentMethodRepository }: Dependencies): CorePaymentMethodUseCases {
    return {
        createPaymentMethod: makeCreatePaymentMethod({ paymentMethodRepository }),
        fetchEmployeePaymentMethod: makeFetchEmployeePaymentMethod({ paymentMethodRepository })
    };
}
export { CorePaymentMethodUseCases } from "../CoreUseCases";
