import { Actions } from "../../core";
import { Transaction } from "../Transaction";
import { buildAddEmployeeTransaction } from "./addEmployee";
import { buildChangeEmployeeTransaction } from "./changeEmployee";
import { buildDeleteEmployeeTransaction } from "./deleteEmployee";
import { buildPostSalesReceiptTransaction } from "./postSalesReceipt";
import { buildPostServiceChargeTransaction } from "./postServiceCharge";
import { buildPostTimeCardTransaction } from "./postTimeCard";

export function buildTransactions(actions: Actions): Transactions {
    return {
        addEmployee: buildAddEmployeeTransaction(actions),
        deleteEmployee: buildDeleteEmployeeTransaction(actions),
        postTimeCard: buildPostTimeCardTransaction(actions),
        postSalesReceipt: buildPostSalesReceiptTransaction(actions),
        postServiceCharge: buildPostServiceChargeTransaction(actions),
        changeEmployee: buildChangeEmployeeTransaction(actions),
        runPayroll: async () => {
            throw new Error("todo");
        }
    };
}

export interface Transactions {
    addEmployee: Transaction;
    deleteEmployee: Transaction;
    postTimeCard: Transaction;
    postSalesReceipt: Transaction;
    postServiceCharge: Transaction;
    changeEmployee: Transaction;
    runPayroll: Transaction;
}
