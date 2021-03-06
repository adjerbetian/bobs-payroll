import { buildStubFor, Stub } from "@infra/test";
import { PaymentRepository } from "../repositories";

export function buildStubbedPaymentRepository(): Stub<PaymentRepository> {
    return buildStubFor({
        fetchLastOfEmployee: true,
        fetchEmployeeLastPaymentDate: true,
        insert: true
    });
}
