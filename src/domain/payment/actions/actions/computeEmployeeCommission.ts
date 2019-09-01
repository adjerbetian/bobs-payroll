import { CommissionedEmployee, CoreActions } from "../../../core";
import { ComputeEmployeeCommission } from "../runCommissionedPayroll";

interface Dependencies {
    coreActions: CoreActions;
}

export function buildComputeEmployeeCommission({ coreActions }: Dependencies): ComputeEmployeeCommission {
    return async function(employee: CommissionedEmployee): Promise<number> {
        const salesReceipts = await coreActions.fetchAllEmployeeSalesReceipts(employee.id);
        const totalSold = salesReceipts.reduce((total, salesReceipt) => total + salesReceipt.amount, 0);
        return totalSold * employee.work.commissionRate;
    };
}
