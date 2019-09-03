import { SalesReceipt } from "../entities";

export interface SalesReceiptRepository {
    fetchAllOfEmployeeSince(employeeId: number, date: string): Promise<SalesReceipt[]>;
    insert(salesReceipt: SalesReceipt): Promise<void>;
}
