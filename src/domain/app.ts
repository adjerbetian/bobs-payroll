import {
    buildActions,
    EmployeeRepository,
    PaymentMethodRepository,
    PaymentRepository,
    SalesReceiptRepository,
    ServiceChargeRepository,
    TimeCardRepository,
    UnionMemberRepository
} from "./core";
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
    const actions = buildActions(dependencies);
    const transactionDomain = buildTransactionDomain(actions);

    return {
        processTransaction: transactionDomain.processTransaction
    };
}
