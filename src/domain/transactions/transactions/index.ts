import { CoreActions } from "../../core";
import { PaymentActions } from "../../payment";
import { Transaction } from "../Transaction";
import { buildAddEmployeeTransaction } from "./addEmployee";
import { buildChangeEmployeeTransaction } from "./changeEmployee";
import { buildDeleteEmployeeTransaction } from "./deleteEmployee";
import { buildPostSalesReceiptTransaction } from "./postSalesReceipt";
import { buildPostServiceChargeTransaction } from "./postServiceCharge";
import { buildPostTimeCardTransaction } from "./postTimeCard";
import { buildRunPayrollTransaction } from "./runPayroll";

export function buildTransactions(actions: CoreActions, paymentActions: PaymentActions): Transactions {
    return {
        addEmployee: buildAddEmployeeTransaction(actions),
        deleteEmployee: buildDeleteEmployeeTransaction(actions),
        postTimeCard: buildPostTimeCardTransaction(actions),
        postSalesReceipt: buildPostSalesReceiptTransaction(actions),
        postServiceCharge: buildPostServiceChargeTransaction(actions),
        changeEmployee: buildChangeEmployeeTransaction(actions),
        runPayroll: buildRunPayrollTransaction(paymentActions)
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
