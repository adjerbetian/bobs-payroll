import { CoreActions } from "../../core";
import { PaymentActions } from "../../payment";
import { makeAddEmployeeTransaction, makeChangeEmployeeTransaction, makeDeleteEmployeeTransaction } from "./employees";
import { makeRunPayrollTransaction } from "./payroll";
import { makeProcessTransaction } from "./processTransaction";
import { makePostSalesReceiptTransaction } from "./salesReceipts";
import { makePostServiceChargeTransaction } from "./serviceCharges";
import { makePostTimeCardTransaction } from "./timeCards";
import { TransactionsActions } from "./TransactionsActions";

export function makeTransactionsActions(coreActions: CoreActions, paymentActions: PaymentActions): TransactionsActions {
    return {
        processTransaction: makeProcessTransaction(
            {
                addEmployee: makeAddEmployeeTransaction(coreActions),
                deleteEmployee: makeDeleteEmployeeTransaction(coreActions),
                postTimeCard: makePostTimeCardTransaction(coreActions),
                postSalesReceipt: makePostSalesReceiptTransaction(coreActions),
                postServiceCharge: makePostServiceChargeTransaction(coreActions),
                changeEmployee: makeChangeEmployeeTransaction(coreActions),
                runPayroll: makeRunPayrollTransaction(paymentActions)
            },
            console
        )
    };
}
