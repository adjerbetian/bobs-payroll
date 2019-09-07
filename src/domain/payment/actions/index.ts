import { CoreActions } from "../../core";
import { PaymentRepository } from "../repositories";
import { PaymentActions } from "./PaymentActions";
import { makeRunPayroll } from "./payroll";

export { PaymentActions } from "./PaymentActions";

export interface PaymentActionsDependencies {
    coreActions: CoreActions;
    paymentRepository: PaymentRepository;
}

export function makePaymentActions({ coreActions, paymentRepository }: PaymentActionsDependencies): PaymentActions {
    return {
        runPayroll: makeRunPayroll({ coreActions, paymentRepository })
    };
}
