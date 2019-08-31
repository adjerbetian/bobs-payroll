import { CommissionedEmployee } from "../../../entities";
import { SalesReceiptRepository } from "../../../repositories";
import { ComputeEmployeeCommission } from "../runCommissionedPayroll";

interface Dependencies {
    salesReceiptRepository: SalesReceiptRepository;
}

export function buildComputeEmployeeCommission({ salesReceiptRepository }: Dependencies): ComputeEmployeeCommission {
    return async function(employee: CommissionedEmployee): Promise<number> {
        const salesReceipts = await salesReceiptRepository.fetchAllOfEmployee(employee.id);
        const totalSold = salesReceipts.reduce((total, salesReceipt) => total + salesReceipt.amount, 0);
        return totalSold * employee.work.commissionRate;
    };
}
