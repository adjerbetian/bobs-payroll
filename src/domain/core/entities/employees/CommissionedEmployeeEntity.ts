import { SalesReceipt } from "../SalesReceipt";
import { CommissionedEmployee } from "./CommissionedEmployee";

export interface CommissionedEmployeeEntity {
    computeCommissionedSalary(salesReceipts: SalesReceipt[]): number;
}

export function buildCommissionedEmployeeEntity(employee: CommissionedEmployee): CommissionedEmployeeEntity {
    return {
        computeCommissionedSalary(salesReceipts: SalesReceipt[]): number {
            const totalSold = computeSalesReceiptsTotalAmount();
            const commission = employee.work.commissionRate * totalSold;
            return commission + employee.work.monthlySalary;

            function computeSalesReceiptsTotalAmount(): number {
                return salesReceipts.reduce((total, salesReceipt) => total + salesReceipt.amount, 0);
            }
        }
    };
}
