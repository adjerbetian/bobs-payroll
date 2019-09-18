import { CoreActions, PaymentActions } from "../domain";
import { makeProcessTransaction } from "./processTransaction";
import {
    makeAddEmployeeTransaction,
    makeChangeEmployeeTransaction,
    makeDeleteEmployeeTransaction,
    makePostSalesReceiptTransaction,
    makePostServiceChargeTransaction,
    makePostTimeCardTransaction,
    makeRunPayrollTransaction
} from "./transactions";
import { Controllers } from "./Controllers";

export { Controllers } from "./Controllers";

export function makeTransactionsActions(coreActions: CoreActions, paymentActions: PaymentActions): Controllers {
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
