import { EmployeeRepository, SalesReceiptRepository } from "../../repositories";
import { CoreSalesReceiptActions } from "../CoreActions";
import { buildCreateSalesReceipt } from "./createSalesReceipt";
import { buildFetchAllEmployeeSalesReceipts } from "./fetchAllEmployeeSalesReceipts";

interface Dependencies {
    employeeRepository: EmployeeRepository;
    salesReceiptRepository: SalesReceiptRepository;
}

export function buildCoreSalesReceiptActions({
    employeeRepository,
    salesReceiptRepository
}: Dependencies): CoreSalesReceiptActions {
    return {
        createSalesReceipt: buildCreateSalesReceipt({ employeeRepository, salesReceiptRepository }),
        fetchAllEmployeeSalesReceipts: buildFetchAllEmployeeSalesReceipts({ salesReceiptRepository })
    };
}
