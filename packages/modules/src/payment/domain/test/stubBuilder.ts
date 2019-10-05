import { buildStubFor, Stub } from "../../../test/utils";
import { PaymentRepository } from "../repositories";

export function buildStubbedPaymentRepository(): Stub<PaymentRepository> {
    return buildStubFor({
        fetchLastOfEmployee: true,
        fetchEmployeeLastPaymentDate: true,
        insert: true
    });
}
