export class TransactionFormatError extends Error {
    public constructor(transactionId: string) {
        super(`Wrong format for the transaction ${transactionId}`);
    }
}
