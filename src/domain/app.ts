import { buildTransactionDomain, TransactionsDependencies } from "./transactions";

export interface App {
    processTransaction(args: string[]): Promise<void>;
}

type AppDependencies = TransactionsDependencies;

export function buildApp(dependencies: AppDependencies): App {
    const transactionDomain = buildTransactionDomain(dependencies);

    return {
        processTransaction: transactionDomain.processTransaction
    };
}
