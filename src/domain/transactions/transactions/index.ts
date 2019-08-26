import { Actions, UnionMemberRepository } from "../../core";
import { Transaction } from "../Transaction";
import { buildAddEmployeeTransaction } from "./addEmployee";
import { buildChangeEmployeeTransaction } from "./changeEmployee";
import { buildDeleteEmployeeTransaction } from "./deleteEmployee";
import { buildPostSalesReceiptTransaction } from "./postSalesReceipt";
import { buildPostServiceChargeTransaction } from "./postServiceCharge";
import { buildPostTimeCardTransaction } from "./postTimeCard";

export interface TransactionsDependencies {
    unionMemberRepository: UnionMemberRepository;
    actions: Actions;
}

export function buildTransactions({ unionMemberRepository, actions }: TransactionsDependencies): Transactions {
    return {
        addEmployee: buildAddEmployeeTransaction(actions),
        deleteEmployee: buildDeleteEmployeeTransaction(actions),
        postTimeCard: buildPostTimeCardTransaction(actions),
        postSalesReceipt: buildPostSalesReceiptTransaction(actions),
        postServiceCharge: buildPostServiceChargeTransaction(actions),
        changeEmployee: buildChangeEmployeeTransaction(actions, {
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
