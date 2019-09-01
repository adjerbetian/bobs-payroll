import { EmployeeRepository, SalesReceiptRepository } from "../../repositories";
import { CoreSalesReceiptActions } from "./CoreSalesReceiptActions";
import { buildCreateSalesReceipt } from "./createSalesReceipt";

export { CoreSalesReceiptActions } from "./CoreSalesReceiptActions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
    salesReceiptRepository: SalesReceiptRepository;
}

export function buildCoreSalesReceiptActions({
    employeeRepository,
    salesReceiptRepository
}: Dependencies): CoreSalesReceiptActions {
    return {
        createSalesReceipt: buildCreateSalesReceipt({ employeeRepository, salesReceiptRepository })
    };
}
