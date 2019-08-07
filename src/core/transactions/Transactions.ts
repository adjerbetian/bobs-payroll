export interface Transactions {
    addEmployee: Transaction;
    deleteEmployee: Transaction;
    postTimeCard: Transaction;
    postSalesReceipt: Transaction;
    postServiceCharge: Transaction;
}

export type Transaction = (...args: string[]) => Promise<void>;