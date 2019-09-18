import { CommissionedEmployee, EmployeeType } from "../Employee";
import { SalesReceipt } from "../SalesReceipt";

export function buildCommissionedEmployee({
    id,
    name,
    address,
    salary,
    commissionRate
}: {
    id: number;
    name: string;
    address: string;
    salary: number;
    commissionRate: number;
}): CommissionedEmployee {
    return Object.freeze({
        getId() {
            return id;
        },
        getAddress() {
            return address;
        },
        getName() {
            return name;
        },
        getType() {
            return EmployeeType.COMMISSIONED;
        },
        hasType(type: EmployeeType) {
            return type === EmployeeType.COMMISSIONED;
        },
        getSalary() {
            return salary;
        },
        getCommissionRate() {
            return commissionRate;
        },
        computeCommissionedSalary(salesReceipts: SalesReceipt[]): number {
            const totalSold = salesReceipts.reduce((total, salesReceipt) => total + salesReceipt.getAmount(), 0);
            const commission = commissionRate * totalSold;
            return commission + salary;
        },
        toJSON() {
            return {
                id,
                name,
                address,
                type: EmployeeType.COMMISSIONED,
                salary,
                commissionRate
            };
        }
    });
}
