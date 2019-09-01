import { EmployeeType, SalesReceipt } from "../../entities";
import { EmployeeTypeError } from "../../errors";
import { EmployeeRepository, SalesReceiptRepository } from "../../repositories";

interface Dependencies {
    salesReceiptRepository: SalesReceiptRepository;
    employeeRepository: EmployeeRepository;
}

export type CreateSalesReceipt = (salesReceipt: SalesReceipt) => Promise<void>;

export function buildCreateSalesReceipt({
    salesReceiptRepository,
    employeeRepository
}: Dependencies): CreateSalesReceipt {
    return async function(salesReceipt: SalesReceipt): Promise<void> {
        await assertEmployeeIsCommissioned(salesReceipt.employeeId);
        return salesReceiptRepository.insert(salesReceipt);
    };

    async function assertEmployeeIsCommissioned(employeeId: number): Promise<void> {
        const employee = await employeeRepository.fetchById(employeeId);
        if (employee.work.type !== EmployeeType.COMMISSIONED) {
            throw new EmployeeTypeError(employee, EmployeeType.COMMISSIONED);
        }
    }
}
