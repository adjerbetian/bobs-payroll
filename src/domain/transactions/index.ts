import { EmployeeRepository, SalesReceiptRepository, ServiceChargeRepository, TimeCardRepository } from "../core";
import { Transaction } from "./Transaction";
import * as transactions from "./transactions";

interface Dependencies {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    salesReceiptRepository: SalesReceiptRepository;
    serviceChargeRepository: ServiceChargeRepository;
}

export function buildTransactions({
    serviceChargeRepository,
    employeeRepository,
    salesReceiptRepository,
    timeCardRepository
}: Dependencies): Transactions {
    return {
        addEmployee: transactions.buildAddEmployeeTransaction({ employeeRepository }),
        deleteEmployee: transactions.buildDeleteEmployeeTransaction({ employeeRepository }),
        postTimeCard: transactions.buildPostTimeCardTransaction({ timeCardRepository, employeeRepository }),
        postSalesReceipt: transactions.buildPostSalesReceiptTransaction({
            salesReceiptRepository,
            employeeRepository
        }),
        postServiceCharge: transactions.buildPostServiceChargeTransaction({
            serviceChargeRepository,
            employeeRepository
        }),
        changeEmployee: transactions.buildChangeEmployeeTransaction({ employeeRepository })
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
