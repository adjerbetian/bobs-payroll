import { buildProcessTransaction, ProcessTransaction } from "./processTransaction";
import { buildTransactions, TransactionsDependencies } from "./transactions";

export { ProcessTransaction } from "./processTransaction";
export { Transactions, TransactionsDependencies } from "./transactions";

export function buildTransactionDomain(
    dependencies: TransactionsDependencies
): { processTransaction: ProcessTransaction } {
    const transactions = buildTransactions(dependencies);
    return {
        processTransaction: buildProcessTransaction(transactions)
    };
}
