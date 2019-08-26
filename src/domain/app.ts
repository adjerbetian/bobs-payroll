import {
    buildActions,
    EmployeeRepository,
    PaymentMethodRepository,
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
}): App {
    const actions = buildActions({
        employeeRepository: dependencies.employeeRepository,
        timeCardRepository: dependencies.timeCardRepository
    });
    const transactionDomain = buildTransactionDomain({ ...dependencies, actions });

    return {
        processTransaction: transactionDomain.processTransaction
    };
}
