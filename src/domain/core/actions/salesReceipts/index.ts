import { EmployeeRepository, SalesReceiptRepository } from "../../repositories";
import { CoreSalesReceiptActions } from "../CoreActions";
import { buildCreateSalesReceipt } from "./createSalesReceipt";

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
