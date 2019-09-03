import { CoreActions } from "../../core";
import { PaymentActions } from "../../payment";
import {
    buildAddEmployeeTransaction,
    buildChangeEmployeeTransaction,
    buildDeleteEmployeeTransaction
} from "./employees";
import { buildRunPayrollTransaction } from "./payroll";
import { buildProcessTransaction } from "./processTransaction";
import { buildPostSalesReceiptTransaction } from "./salesReceipts";
import { buildPostServiceChargeTransaction } from "./serviceCharges";
import { buildPostTimeCardTransaction } from "./timeCards";
import { TransactionsActions } from "./TransactionsActions";

export function buildTransactionsActions(
    coreActions: CoreActions,
    paymentActions: PaymentActions
): TransactionsActions {
    return {
        processTransaction: buildProcessTransaction({
            addEmployee: buildAddEmployeeTransaction(coreActions),
            deleteEmployee: buildDeleteEmployeeTransaction(coreActions),
            postTimeCard: buildPostTimeCardTransaction(coreActions),
            postSalesReceipt: buildPostSalesReceiptTransaction(coreActions),
            postServiceCharge: buildPostServiceChargeTransaction(coreActions),
            changeEmployee: buildChangeEmployeeTransaction(coreActions),
            runPayroll: buildRunPayrollTransaction(paymentActions)
        })
    };
}
