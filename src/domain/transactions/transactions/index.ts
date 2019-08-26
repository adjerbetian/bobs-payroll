import { Actions, EmployeeRepository, PaymentMethodRepository, UnionMemberRepository } from "../../core";
import { Transaction } from "../Transaction";
import { buildAddEmployeeTransaction } from "./addEmployee";
import { buildChangeEmployeeTransaction } from "./changeEmployee";
import { buildDeleteEmployeeTransaction } from "./deleteEmployee";
import { buildPostSalesReceiptTransaction } from "./postSalesReceipt";
import { buildPostServiceChargeTransaction } from "./postServiceCharge";
import { buildPostTimeCardTransaction } from "./postTimeCard";

export interface TransactionsDependencies {
    employeeRepository: EmployeeRepository;
    paymentMethodRepository: PaymentMethodRepository;
    unionMemberRepository: UnionMemberRepository;
    actions: Actions;
}

export function buildTransactions({
    employeeRepository,
    paymentMethodRepository,
    unionMemberRepository,
    actions
}: TransactionsDependencies): Transactions {
    return {
        addEmployee: buildAddEmployeeTransaction({ employeeRepository }),
        deleteEmployee: buildDeleteEmployeeTransaction(actions),
        postTimeCard: buildPostTimeCardTransaction(actions),
        postSalesReceipt: buildPostSalesReceiptTransaction(actions),
        postServiceCharge: buildPostServiceChargeTransaction(actions),
        changeEmployee: buildChangeEmployeeTransaction({
            employeeRepository,
            paymentMethodRepository,
            unionMemberRepository
        })
    };
}

export interface Transactions {
    addEmployee: Transaction;
    deleteEmployee: Transaction;
    postTimeCard: Transaction;
    postSalesReceipt: Transaction;
    postServiceCharge: Transaction;
    changeEmployee: Transaction;
}
