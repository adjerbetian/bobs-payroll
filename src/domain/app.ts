import {
    EmployeeRepository,
    PaymentMethodRepository,
    SalesReceiptRepository,
    ServiceChargeRepository,
    TimeCardRepository
} from "./core";
import { buildTransactionDomain } from "./transactions";

export interface App {
    processTransaction(args: string[]): Promise<void>;
}

interface Dependencies {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    salesReceiptRepository: SalesReceiptRepository;
    serviceChargeRepository: ServiceChargeRepository;
    paymentMethodRepository: PaymentMethodRepository;
}

export function buildApp({
    salesReceiptRepository,
    employeeRepository,
    serviceChargeRepository,
    timeCardRepository,
    paymentMethodRepository
}: Dependencies): App {
    const transactionDomain = buildTransactionDomain({
        salesReceiptRepository,
        employeeRepository,
        serviceChargeRepository,
        timeCardRepository,
        paymentMethodRepository
    });

    return {
        processTransaction: transactionDomain.processTransaction
    };
}
