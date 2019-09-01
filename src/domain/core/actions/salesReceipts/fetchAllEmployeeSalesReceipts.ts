import { SalesReceipt } from "../../entities";
import { SalesReceiptRepository } from "../../repositories";
import { CoreSalesReceiptActions } from "../CoreActions";

interface Dependencies {
    salesReceiptRepository: SalesReceiptRepository;
}

export function buildFetchAllEmployeeSalesReceipts({
    salesReceiptRepository
}: Dependencies): CoreSalesReceiptActions["fetchAllEmployeeSalesReceipts"] {
    return async function(employeeId: number): Promise<SalesReceipt[]> {
        return salesReceiptRepository.fetchAllOfEmployee(employeeId);
    };
}
