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

interface AppDependencies {
    employeeRepository: EmployeeRepository;
    paymentMethodRepository: PaymentMethodRepository;
    salesReceiptRepository: SalesReceiptRepository;
    serviceChargeRepository: ServiceChargeRepository;
    timeCardRepository: TimeCardRepository;
    unionMemberRepository: UnionMemberRepository;
    paymentRepository: PaymentRepository;
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
        paymentMethodRepository,
        paymentRepository,
        salesReceiptRepository
    });
    const transactionDomain = buildTransactionDomain(coreActions, paymentActions);

    return {
        processTransaction: transactionDomain.processTransaction
    };
}
