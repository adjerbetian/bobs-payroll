import { CoreActions } from "../core";
import { PaymentActions } from "../payment";
import { buildProcessTransaction, ProcessTransaction } from "./processTransaction";
import { buildTransactions } from "./transactions";

export { ProcessTransaction } from "./processTransaction";
export { Transactions } from "./transactions";

export function buildTransactionDomain(
    coreActions: CoreActions,
    paymentActions: PaymentActions
): { processTransaction: ProcessTransaction } {
    const transactions = buildTransactions(coreActions, paymentActions);
    return {
        processTransaction: buildProcessTransaction(transactions)
    };
}
