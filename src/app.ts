import { ProcessTransaction } from "./processTransaction";

export interface App {
    run(): Promise<void>;
}

export function buildApp({
    initConnection,
    closeConnection,
    processTransaction
}: {
    initConnection: () => Promise<void>;
    closeConnection: () => Promise<void>;
    processTransaction: ProcessTransaction;
}): App {
    return {
        async run(): Promise<void> {
            await initConnection();
            await processTransaction(process.argv.slice(2));
            await closeConnection();
        }
    };
}
