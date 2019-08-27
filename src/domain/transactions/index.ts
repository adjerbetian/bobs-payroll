import { Actions } from "../core";
import { buildProcessTransaction, ProcessTransaction } from "./processTransaction";
import { buildTransactions } from "./transactions";

export { ProcessTransaction } from "./processTransaction";
export { Transactions } from "./transactions";

export function buildTransactionDomain(actions: Actions): { processTransaction: ProcessTransaction } {
    const transactions = buildTransactions(actions);
    return {
        processTransaction: buildProcessTransaction(transactions)
    };
}
