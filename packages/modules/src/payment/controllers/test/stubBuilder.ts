import { buildStubFor, Stub } from "@bobs-payroll/test";
import { PaymentUseCases } from "../../domain";

export function buildStubbedPaymentUseCases(): Stub<PaymentUseCases> {
    return buildStubFor({
        runPayroll: true
    });
}
