import { buildStubFor, Stub } from "@test/utils";
import { CoreActions } from "../../../core";
import { PaymentActions } from "../../domain";

export function buildStubbedPaymentActions(): Stub<PaymentActions> {
    return buildStubFor({
        runPayroll: true
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
