import * as moment from "moment";
import { isoDate } from "../../../../../utils";
import { buildEmployeeEntity, CommissionedEmployee, CoreActions, SalesReceipt } from "../../../../core";
import { CreatePaymentForEmployee } from "../../payment";
import { RunPayrollActions } from "../runPayrollDispatcher";

interface Dependencies {
    coreActions: CoreActions;
    createPaymentForEmployee: CreatePaymentForEmployee;
}

export function makeRunCommissionedPayroll({
    coreActions,
    createPaymentForEmployee
}: Dependencies): RunPayrollActions["runCommissionedPayroll"] {
    return async function(date: string): Promise<void> {
        const employees = await coreActions.fetchAllCommissionedEmployees();
        for (const employee of employees) {
            await payEmployee(date, employee);
        }
    };

    async function payEmployee(date: string, employee: CommissionedEmployee): Promise<void> {
        await createPaymentForEmployee({
            employeeId: employee.id,
            amount: await computePayAmount(),
            date
        });

        async function computePayAmount(): Promise<number> {
            const salesReceipts = await fetchEmployeeSalesReceiptOfTheMonth();
            const employeeEntity = buildEmployeeEntity(employee);
            return employeeEntity.computeCommissionedSalary(salesReceipts);
        }

        async function fetchEmployeeSalesReceiptOfTheMonth(): Promise<SalesReceipt[]> {
            const beginningOfMonth = isoDate(moment(date).startOf("month"));
            return coreActions.fetchAllEmployeeSalesReceiptsSince(employee.id, beginningOfMonth);
        }
    }
}
