export interface Transactions {
    addEmployee: Transaction;
    deleteEmployee: Transaction;
}

export type Transaction = (...args: string[]) => Promise<void>;
