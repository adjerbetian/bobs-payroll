export interface TransactionsActions {
    processTransaction: (args: string[]) => Promise<void>;
}
