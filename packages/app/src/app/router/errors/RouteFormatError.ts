export class RouteFormatError extends Error {
    public constructor(transactionId: string) {
        super(`Wrong format for the route ${transactionId}`);
    }
}
