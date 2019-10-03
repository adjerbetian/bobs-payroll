import { buildStubFor, Stub } from "@test/utils";
import { PaymentUseCases } from "../../domain";

export function buildStubbedPaymentUseCases(): Stub<PaymentUseCases> {
    return buildStubFor({
        runPayroll: true
    });
}
