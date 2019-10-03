import { Stub } from "@test/utils";
import { buildStubFor } from "@test/utils/stubBuilder";
import { PaymentRepository } from "../repositories";

export function buildStubbedPaymentRepository(): Stub<PaymentRepository> {
    return buildStubFor({
        fetchLastOfEmployee: true,
        fetchEmployeeLastPaymentDate: true,
        insert: true
    });
}
