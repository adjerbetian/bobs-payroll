import { Stub } from "@test/utils";
import { buildStubFor } from "@test/utils/stubBuilder";
import { CoreActions } from "../../core";
import { PaymentRepository } from "../repositories";

export function buildStubbedPaymentRepository(): Stub<PaymentRepository> {
    return buildStubFor({
        fetchLastOfEmployee: true,
        fetchEmployeeLastPaymentDate: true,
        insert: true
    });
}

export function buildStubbedCoreActions(): Stub<CoreActions> {
    return buildStubFor<CoreActions>({
        createEmployee: true,
        deleteEmployee: true,
        updateEmployee: true,
        fetchAllHourlyEmployees: true,
        fetchAllSalariedEmployees: true,
        fetchAllCommissionedEmployees: true,

        createTimeCard: true,
        fetchEmployeeTimeCardsSince: true,

        createServiceCharge: true,

        createSalesReceipt: true,
        fetchAllEmployeeSalesReceiptsSince: true,

        createPaymentMethod: true,
        fetchEmployeePaymentMethod: true,

        createUnionMember: true,
        removeEmployeeFromUnion: true
    });
}
