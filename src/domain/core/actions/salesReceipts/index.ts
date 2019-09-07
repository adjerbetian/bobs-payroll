import { EmployeeRepository, SalesReceiptRepository } from "../../repositories";
import { CoreSalesReceiptActions } from "../CoreActions";
import { makeCreateSalesReceipt } from "./createSalesReceipt";
import { makeFetchAllEmployeeSalesReceipts } from "./fetchAllEmployeeSalesReceiptsSince";

interface Dependencies {
    employeeRepository: EmployeeRepository;
    salesReceiptRepository: SalesReceiptRepository;
}

export function makeCoreSalesReceiptActions({
    employeeRepository,
    salesReceiptRepository
}: Dependencies): CoreSalesReceiptActions {
    return {
        createSalesReceipt: makeCreateSalesReceipt({ employeeRepository, salesReceiptRepository }),
        fetchAllEmployeeSalesReceiptsSince: makeFetchAllEmployeeSalesReceipts({ salesReceiptRepository })
    };
}
