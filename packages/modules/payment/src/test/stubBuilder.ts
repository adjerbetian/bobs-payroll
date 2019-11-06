import { buildStubFor, Stub } from "@payroll/test";
import { CoreUseCases } from "@payroll/core";

export function buildStubbedCoreUseCases(): Stub<CoreUseCases> {
    return buildStubFor<CoreUseCases>({
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

        createUnionMembership: true,
        removeEmployeeFromUnion: true
    });
}