import { makeCoreActions, CoreDependencies } from "./core";
import { makePaymentActions, PaymentDependencies } from "./payment";
import { makeTransactionsActions } from "./transactions";

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
    const coreActions = makeCoreActions({
        employeeRepository,
        paymentMethodRepository,
        salesReceiptRepository,
        serviceChargeRepository,
        timeCardRepository,
        unionMemberRepository
    });
    const paymentActions = makePaymentActions({
        coreActions,
        paymentRepository
    });
    const transactionDomain = makeTransactionsActions(coreActions, paymentActions);

    return {
        processTransaction: transactionDomain.processTransaction
    };
}
