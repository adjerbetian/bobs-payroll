import {
    buildCoreActions,
    EmployeeRepository,
    PaymentMethodRepository,
    SalesReceiptRepository,
    ServiceChargeRepository,
    TimeCardRepository,
    UnionMemberRepository
} from "./core";
import { buildPaymentActions, PaymentRepository } from "./payment";
import { buildTransactionDomain } from "./transactions";

export interface App {
    processTransaction(args: string[]): Promise<void>;
}

export function buildApp(dependencies: {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    salesReceiptRepository: SalesReceiptRepository;
    serviceChargeRepository: ServiceChargeRepository;
    paymentMethodRepository: PaymentMethodRepository;
    unionMemberRepository: UnionMemberRepository;
    paymentRepository: PaymentRepository;
}): App {
    const coreActions = buildCoreActions(dependencies);
    const paymentActions = buildPaymentActions(dependencies);
    const transactionDomain = buildTransactionDomain(coreActions, paymentActions);

    return {
        processTransaction: transactionDomain.processTransaction
    };
}
