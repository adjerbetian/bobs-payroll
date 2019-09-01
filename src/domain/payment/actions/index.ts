import { CoreActions } from "../../core";
import { PaymentRepository } from "../repositories";
import { PaymentActions } from "./PaymentActions";
import { buildRunPayroll } from "./payroll";

export { PaymentActions } from "./PaymentActions";

export interface PaymentActionsDependencies {
    coreActions: CoreActions;
    paymentRepository: PaymentRepository;
}

export function buildPaymentActions({ coreActions, paymentRepository }: PaymentActionsDependencies): PaymentActions {
    return {
        runPayroll: buildRunPayroll({ coreActions, paymentRepository })
    };
}
