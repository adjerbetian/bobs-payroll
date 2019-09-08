import { EmployeeType, SalesReceipt } from "../../entities";
import { EmployeeTypeError } from "../../errors";
import { EmployeeRepository, SalesReceiptRepository } from "../../repositories";
import { CoreSalesReceiptActions } from "../CoreActions";

interface Dependencies {
    salesReceiptRepository: SalesReceiptRepository;
    employeeRepository: EmployeeRepository;
}

export function makeCreateSalesReceipt({
    salesReceiptRepository,
    employeeRepository
}: Dependencies): CoreSalesReceiptActions["createSalesReceipt"] {
    return async function(salesReceipt: SalesReceipt): Promise<void> {
        await assertEmployeeIsCommissioned(salesReceipt.employeeId);
        return salesReceiptRepository.insert(salesReceipt);
    };

    async function assertEmployeeIsCommissioned(employeeId: number): Promise<void> {
        const employee = await employeeRepository.fetchById(employeeId);
        if (!employee.hasType(EmployeeType.COMMISSIONED)) {
            throw new EmployeeTypeError(employee, EmployeeType.COMMISSIONED);
        }
    }
}
