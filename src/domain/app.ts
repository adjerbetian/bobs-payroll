import { buildCoreActions, CoreActionsDependencies } from "./core";
import { buildPaymentActions, PaymentActionsDependencies } from "./payment";
import { buildTransactionDomain } from "./transactions";

export interface App {
    processTransaction(args: string[]): Promise<void>;
}

export function buildApp(dependencies: CoreActionsDependencies & PaymentActionsDependencies): App {
    const coreActions = buildCoreActions(dependencies);
    const paymentActions = buildPaymentActions(dependencies);
    const transactionDomain = buildTransactionDomain(coreActions, paymentActions);

    return {
        processTransaction: transactionDomain.processTransaction
    };
}
