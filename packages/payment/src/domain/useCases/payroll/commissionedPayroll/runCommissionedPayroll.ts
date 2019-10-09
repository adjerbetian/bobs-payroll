import { isoDate } from "@payroll/common";
import { CommissionedEmployee, CoreUseCases, SalesReceipt } from "@payroll/core";
import * as moment from "moment";
import { CreatePaymentForEmployee } from "../../payment";
import { RunPayrollUseCases } from "../runPayrollDispatcher";

interface Dependencies {
    coreUseCases: CoreUseCases;
    createPaymentForEmployee: CreatePaymentForEmployee;
}

export function makeRunCommissionedPayroll({
    coreUseCases,
    createPaymentForEmployee
}: Dependencies): RunPayrollUseCases["runCommissionedPayroll"] {
    return async function(date) {
        const employees = await coreUseCases.fetchAllCommissionedEmployees();
        for (const employee of employees) {
            await payEmployee(date, employee);
        }
    };

    async function payEmployee(date: string, employee: CommissionedEmployee): Promise<void> {
        await createPaymentForEmployee({
            employeeId: employee.getId(),
            amount: await computePayAmount(),
            date
        });

        async function computePayAmount(): Promise<number> {
            const salesReceipts = await fetchEmployeeSalesReceiptOfTheMonth();
            return employee.computeCommissionedSalary(salesReceipts);
        }

        async function fetchEmployeeSalesReceiptOfTheMonth(): Promise<SalesReceipt[]> {
            const beginningOfMonth = isoDate(moment(date).startOf("month"));
            return coreUseCases.fetchAllEmployeeSalesReceiptsSince(employee.getId(), beginningOfMonth);
        }
    }
}
