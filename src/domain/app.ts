import { buildCoreActions, CoreDependencies } from "./core";
import { buildPaymentActions, PaymentDependencies } from "./payment";
import { buildTransactionsActions } from "./transactions";

export interface App {
    processTransaction(args: string[]): Promise<void>;
}

interface AppDependencies {
    employeeRepository: CoreDependencies["employeeRepository"];
    paymentMethodRepository: CoreDependencies["paymentMethodRepository"];
    salesReceiptRepository: CoreDependencies["salesReceiptRepository"];
    serviceChargeRepository: CoreDependencies["serviceChargeRepository"];
    timeCardRepository: CoreDependencies["timeCardRepository"];
    unionMemberRepository: CoreDependencies["unionMemberRepository"];

    paymentRepository: PaymentDependencies["paymentRepository"];
}

export function buildApp({
    employeeRepository,
    paymentMethodRepository,
    salesReceiptRepository,
    serviceChargeRepository,
    timeCardRepository,
    unionMemberRepository,
    paymentRepository
}: AppDependencies): App {
    const coreActions = buildCoreActions({
        employeeRepository,
        paymentMethodRepository,
        salesReceiptRepository,
        serviceChargeRepository,
        timeCardRepository,
        unionMemberRepository
    });
    const paymentActions = buildPaymentActions({
        coreActions,
        paymentRepository
    });
    const transactionDomain = buildTransactionsActions(coreActions, paymentActions);

    return {
        processTransaction: transactionDomain.processTransaction
    };
}
