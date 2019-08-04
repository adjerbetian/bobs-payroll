export class TransactionFormatError extends Error {
    public constructor(transactionId: string) {
        super(`Wromg format for the transaction ${transactionId}`);
    }
}
