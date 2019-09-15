export type ProcessTransaction = (args: string[]) => Promise<void>;

type Transaction = (...args: string[]) => Promise<void>;

export interface Transactions {
    addEmployee: Transaction;
    deleteEmployee: Transaction;
    postTimeCard: Transaction;
    postSalesReceipt: Transaction;
    postServiceCharge: Transaction;
    changeEmployee: Transaction;
    runPayroll: Transaction;
}

interface Logger {
    log: (...args: any) => Promise<void> | void;
}

export function makeProcessTransaction(transactions: Transactions, logger: Logger): ProcessTransaction {
    return async ([transactionName, ...args]) => {
        try {
            if (transactionName === "AddEmp") await transactions.addEmployee(...args);
            if (transactionName === "DelEmp") await transactions.deleteEmployee(...args);
            if (transactionName === "TimeCard") await transactions.postTimeCard(...args);
            if (transactionName === "SalesReceipt") await transactions.postSalesReceipt(...args);
            if (transactionName === "ServiceCharge") await transactions.postServiceCharge(...args);
            if (transactionName === "ChgEmp") await transactions.changeEmployee(...args);
            if (transactionName === "Payroll") await transactions.runPayroll(...args);
        } catch (err) {
            await logger.log("AN ERROR HAS OCCURRED", err);
        }
    };
}
