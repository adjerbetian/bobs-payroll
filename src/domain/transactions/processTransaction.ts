import { Transactions } from "./transactions";

export type ProcessTransaction = (args: string[]) => Promise<void>;

export function buildProcessTransaction(transactions: Transactions): ProcessTransaction {
    return async ([transactionName, ...args]: string[]) => {
        try {
            if (transactionName === "AddEmp") {
                await transactions.addEmployee(...args);
            }
            if (transactionName === "DelEmp") {
                await transactions.deleteEmployee(...args);
            }
            if (transactionName === "TimeCard") {
                await transactions.postTimeCard(...args);
            }
            if (transactionName === "SalesReceipt") {
                await transactions.postSalesReceipt(...args);
            }
            if (transactionName === "ServiceCharge") {
                await transactions.postServiceCharge(...args);
            }
            if (transactionName === "ChgEmp") {
                await transactions.changeEmployee(...args);
            }
        } catch (err) {
            console.log("AN ERROR HAS OCCURRED");
            console.log({ err });
        }
    };
}
