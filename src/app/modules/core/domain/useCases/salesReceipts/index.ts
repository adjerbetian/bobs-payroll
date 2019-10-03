import { EmployeeRepository, SalesReceiptRepository } from "../../repositories";
import { CoreSalesReceiptUseCases } from "../CoreUseCases";
import { makeCreateSalesReceipt } from "./createSalesReceipt";
import { makeFetchAllEmployeeSalesReceipts } from "./fetchAllEmployeeSalesReceiptsSince";

interface Dependencies {
    employeeRepository: EmployeeRepository;
    salesReceiptRepository: SalesReceiptRepository;
}

export function makeCoreSalesReceiptUseCases({
    employeeRepository,
    salesReceiptRepository
}: Dependencies): CoreSalesReceiptUseCases {
    return {
        createSalesReceipt: makeCreateSalesReceipt({ employeeRepository, salesReceiptRepository }),
        fetchAllEmployeeSalesReceiptsSince: makeFetchAllEmployeeSalesReceipts({ salesReceiptRepository })
    };
}
