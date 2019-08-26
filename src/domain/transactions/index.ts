import {
    Actions,
    EmployeeRepository,
    PaymentMethodRepository,
    SalesReceiptRepository,
    ServiceChargeRepository,
    TimeCardRepository,
    UnionMemberRepository
} from "../core";
import { buildProcessTransaction, ProcessTransaction } from "./processTransaction";
import { buildTransactions } from "./transactions";

export { ProcessTransaction } from "./processTransaction";
export { Transactions } from "./transactions";

export function buildTransactionDomain(dependencies: {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    salesReceiptRepository: SalesReceiptRepository;
    serviceChargeRepository: ServiceChargeRepository;
    paymentMethodRepository: PaymentMethodRepository;
    unionMemberRepository: UnionMemberRepository;
    actions: Actions;
}): { processTransaction: ProcessTransaction } {
    const transactions = buildTransactions(dependencies);
    return {
        processTransaction: buildProcessTransaction(transactions)
    };
}
