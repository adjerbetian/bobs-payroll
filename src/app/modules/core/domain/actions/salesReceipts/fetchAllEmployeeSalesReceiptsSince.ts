import { SalesReceiptRepository } from "../../repositories";
import { CoreSalesReceiptActions } from "../CoreActions";

interface Dependencies {
    salesReceiptRepository: SalesReceiptRepository;
}

export function makeFetchAllEmployeeSalesReceipts({
    salesReceiptRepository
}: Dependencies): CoreSalesReceiptActions["fetchAllEmployeeSalesReceiptsSince"] {
    return async function(employeeId, date) {
        return salesReceiptRepository.fetchAllOfEmployeeSince(employeeId, date);
    };
}