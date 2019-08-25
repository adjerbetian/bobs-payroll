import {
    EmployeeRepository,
    PaymentMethodRepository,
    SalesReceiptRepository,
    ServiceChargeRepository,
    TimeCardRepository
} from "../core";
import { buildProcessTransaction, ProcessTransaction } from "./processTransaction";
import { buildTransactions } from "./transactions";

export { ProcessTransaction } from "./processTransaction";
export { Transactions } from "./transactions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    salesReceiptRepository: SalesReceiptRepository;
    serviceChargeRepository: ServiceChargeRepository;
    paymentMethodRepository: PaymentMethodRepository;
}

export function buildTransactionDomain({
    employeeRepository,
    salesReceiptRepository,
    serviceChargeRepository,
    timeCardRepository,
    paymentMethodRepository
}: Dependencies): { processTransaction: ProcessTransaction } {
    const transactions = buildTransactions({
        employeeRepository,
        salesReceiptRepository,
        serviceChargeRepository,
        timeCardRepository,
        paymentMethodRepository
    });
    return {
        processTransaction: buildProcessTransaction(transactions)
    };
}
