import { EmployeeRepository, SalesReceiptRepository } from "../../repositories";
import { CoreSalesReceiptActions } from "../CoreActions";
import { buildCreateSalesReceipt } from "./createSalesReceipt";
import { buildFetchAllEmployeeSalesReceipts } from "./fetchAllEmployeeSalesReceiptsSince";

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
        fetchAllEmployeeSalesReceiptsSince: buildFetchAllEmployeeSalesReceipts({ salesReceiptRepository })
    };
}
