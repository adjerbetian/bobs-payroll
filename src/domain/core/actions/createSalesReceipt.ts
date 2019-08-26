import { EmployeeType, SalesReceipt } from "../entities";
import { EmployeeTypeError } from "../errors";
import { EmployeeRepository, SalesReceiptRepository } from "../repositories";

interface Dependencies {
    salesReceiptRepository: SalesReceiptRepository;
    employeeRepository: EmployeeRepository;
}

export type CreateSalesReceiptAction = (salesReceipt: SalesReceipt) => Promise<void>;

export function buildCreateSalesReceiptAction({
    salesReceiptRepository,
    employeeRepository
}: Dependencies): CreateSalesReceiptAction {
    return async function(salesReceipt: SalesReceipt): Promise<void> {
        await assertEmployeeIsCommissioned(salesReceipt.employeeId);
        return salesReceiptRepository.insert(salesReceipt);
    };

    async function assertEmployeeIsCommissioned(employeeId: number): Promise<void> {
        const employee = await employeeRepository.fetchById(employeeId);
        if (employee.type !== EmployeeType.COMMISSIONED) {
            throw new EmployeeTypeError(employee, EmployeeType.COMMISSIONED);
        }
    }
}
