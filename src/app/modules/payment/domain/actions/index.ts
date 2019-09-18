import { CoreActions } from "../../../core";
import { PaymentRepository } from "../repositories";
import { PaymentActions } from "./PaymentActions";
import { makeRunPayroll } from "./payroll";

export { PaymentActions } from "./PaymentActions";

interface Dependencies {
    coreActions: CoreActions;
    paymentRepository: PaymentRepository;
}

export function makePaymentActions({ coreActions, paymentRepository }: Dependencies): PaymentActions {
    return {
        runPayroll: makeRunPayroll({ coreActions, paymentRepository })
    };
}
