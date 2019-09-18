import { CoreDependencies, makeCoreActions, makePaymentActions, PaymentDependencies } from "./domain";
import { makeTransactionsActions, TransactionsActions } from "./controllers";

export interface App {
    processTransaction: TransactionsActions["processTransaction"];
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
