import { CoreUseCases } from "../../../core";
import { PaymentRepository } from "../repositories";
import { PaymentUseCases } from "./PaymentUseCases";
import { makeRunPayroll } from "./payroll";

export { PaymentUseCases } from "./PaymentUseCases";

interface Dependencies {
    coreUseCases: CoreUseCases;
    paymentRepository: PaymentRepository;
}

export function makePaymentUseCases({ coreUseCases, paymentRepository }: Dependencies): PaymentUseCases {
    return {
        runPayroll: makeRunPayroll({ coreUseCases, paymentRepository })
    };
}
