import { buildSalesReceipt, EmployeeType } from "../../entities";
import { EmployeeTypeError } from "../../errors";
import { EmployeeRepository, SalesReceiptRepository } from "../../repositories";
import { CoreSalesReceiptUseCases } from "../CoreUseCases";

interface Dependencies {
    salesReceiptRepository: SalesReceiptRepository;
    employeeRepository: EmployeeRepository;
}

export function makeCreateSalesReceipt({
    salesReceiptRepository,
    employeeRepository
}: Dependencies): CoreSalesReceiptUseCases["createSalesReceipt"] {
    return async function(creationModel) {
        await assertEmployeeIsCommissioned(creationModel.employeeId);

        const salesReceipt = buildSalesReceipt(creationModel);
        return salesReceiptRepository.insert(salesReceipt);
    };

    async function assertEmployeeIsCommissioned(employeeId: number): Promise<void> {
        const employee = await employeeRepository.fetchById(employeeId);
        if (!employee.hasType(EmployeeType.COMMISSIONED)) {
            throw new EmployeeTypeError(employee, EmployeeType.COMMISSIONED);
        }
    }
}
