import * as moment from "moment";
import { isoDate } from "../../../../../utils";
import { CommissionedEmployee, CoreActions, SalesReceipt } from "../../../../core";
import { ComputeEmployeeCommission } from "./runCommissionedPayroll";

interface Dependencies {
    coreActions: CoreActions;
}

export function makeComputeEmployeeCommission({ coreActions }: Dependencies): ComputeEmployeeCommission {
    return async function(date: string, employee: CommissionedEmployee): Promise<number> {
        const salesReceipts = await fetchEmployeeSalesReceiptOfTheMonth(date, employee);
        const totalSold = computeSalesReceiptsTotalAmount(salesReceipts);
        return employee.work.commissionRate * totalSold;
    };

    async function fetchEmployeeSalesReceiptOfTheMonth(
        date: string,
        employee: CommissionedEmployee
    ): Promise<SalesReceipt[]> {
        const beginningOfMonth = isoDate(moment(date).startOf("month"));
        return coreActions.fetchAllEmployeeSalesReceiptsSince(employee.id, beginningOfMonth);
    }

    function computeSalesReceiptsTotalAmount(salesReceipts: SalesReceipt[]): number {
        return salesReceipts.reduce((total, salesReceipt) => total + salesReceipt.amount, 0);
    }
}
