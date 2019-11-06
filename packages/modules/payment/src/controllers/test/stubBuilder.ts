import { buildStubFor, Stub } from "@infra/test";
import { PaymentUseCases } from "../../domain";

export function buildStubbedPaymentUseCases(): Stub<PaymentUseCases> {
    return buildStubFor({
        runPayroll: true
    });
}
