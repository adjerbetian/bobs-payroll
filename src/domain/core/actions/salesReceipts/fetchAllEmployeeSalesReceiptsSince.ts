import { SalesReceipt } from "../../entities";
import { SalesReceiptRepository } from "../../repositories";
import { CoreSalesReceiptActions } from "../CoreActions";

interface Dependencies {
    salesReceiptRepository: SalesReceiptRepository;
}

export function buildFetchAllEmployeeSalesReceipts({
    salesReceiptRepository
}: Dependencies): CoreSalesReceiptActions["fetchAllEmployeeSalesReceiptsSince"] {
    return async function(employeeId: number, date: string): Promise<SalesReceipt[]> {
        return salesReceiptRepository.fetchAllOfEmployeeSince(employeeId, date);
    };
}
