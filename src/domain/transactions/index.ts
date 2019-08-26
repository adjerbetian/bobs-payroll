import {
    Actions,
    EmployeeRepository,
    PaymentMethodRepository,
    SalesReceiptRepository,
    ServiceChargeRepository,
    UnionMemberRepository
} from "../core";
import { buildProcessTransaction, ProcessTransaction } from "./processTransaction";
import { buildTransactions } from "./transactions";

export { ProcessTransaction } from "./processTransaction";
export { Transactions } from "./transactions";

export function buildTransactionDomain(dependencies: {
    employeeRepository: EmployeeRepository;
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
