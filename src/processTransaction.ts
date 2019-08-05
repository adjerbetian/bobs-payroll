import { Transactions } from "./transactions";

export type ProcessTransaction = (...args: string[]) => Promise<void>;

export function buildProcessTransaction(transactions: Transactions): ProcessTransaction {
    return async (transactionName: string, ...args: string[]) => {
        if (transactionName === "AddEmp") {
            return transactions.addEmployee(...args);
        }
        if (transactionName === "DelEmp") {
            return transactions.deleteEmployee(...args);
        }
        if (transactionName === "TimeCard") {
            return transactions.postTimeCard(...args);
        }
        if (transactionName === "SalesReceipt") {
            return transactions.postSalesReceipt(...args);
        }
    };
}
