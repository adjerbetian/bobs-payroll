import { SalesReceiptRepository } from "../../repositories";
import { CoreSalesReceiptUseCases } from "../CoreUseCases";

interface Dependencies {
    salesReceiptRepository: SalesReceiptRepository;
}

export function makeFetchAllEmployeeSalesReceipts({
    salesReceiptRepository
}: Dependencies): CoreSalesReceiptUseCases["fetchAllEmployeeSalesReceiptsSince"] {
    return async function(employeeId, date) {
        return salesReceiptRepository.fetchAllOfEmployeeSince(employeeId, date);
    };
}
