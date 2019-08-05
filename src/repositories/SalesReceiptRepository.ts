import { SalesReceipt } from "../entities";

export interface SalesReceiptRepository {
    fetchAllOfEmployee(employeeId: number): Promise<SalesReceipt[]>;
}
