import { CoreActions, PaymentActions } from "../domain";
import { makeRouter, Router } from "./router";
import { makeRoutes } from "./routes";
import {
    makeAddEmployeeTransaction,
    makeChangeEmployeeTransaction,
    makeDeleteEmployeeTransaction,
    makePostSalesReceiptTransaction,
    makePostServiceChargeTransaction,
    makePostTimeCardTransaction,
    makeRunPayrollTransaction
} from "./transactions";

export { Router, Routes } from "./router";
export { buildTransactionValidator, TransactionValidator } from "./utils";
export * from "./errors";

export function makeTransactionsRouter(coreActions: CoreActions, paymentActions: PaymentActions): Router {
    const routes = makeRoutes({
        addEmployee: makeAddEmployeeTransaction(coreActions),
        deleteEmployee: makeDeleteEmployeeTransaction(coreActions),
        postTimeCard: makePostTimeCardTransaction(coreActions),
        postSalesReceipt: makePostSalesReceiptTransaction(coreActions),
        postServiceCharge: makePostServiceChargeTransaction(coreActions),
        changeEmployee: makeChangeEmployeeTransaction(coreActions),
        runPayroll: makeRunPayrollTransaction(paymentActions)
    });
    const router = makeRouter(console);
    router.addRoutes(routes);
    return router;
}
