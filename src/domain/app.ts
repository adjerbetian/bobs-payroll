import { EmployeeRepository, SalesReceiptRepository, ServiceChargeRepository, TimeCardRepository } from "./core";
import { buildTransactionDomain } from "./transactions";

export interface App {
    processTransaction(args: string[]): Promise<void>;
}

interface Dependencies {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    salesReceiptRepository: SalesReceiptRepository;
    serviceChargeRepository: ServiceChargeRepository;
}

export function buildApp({
    salesReceiptRepository,
    employeeRepository,
    serviceChargeRepository,
    timeCardRepository
}: Dependencies): App {
    const transactionDomain = buildTransactionDomain({
        salesReceiptRepository,
        employeeRepository,
        serviceChargeRepository,
        timeCardRepository
    });

    return {
        processTransaction: transactionDomain.processTransaction
    };
}
