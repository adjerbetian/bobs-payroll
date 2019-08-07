import {
    EmployeeRepository,
    SalesReceiptRepository,
    ServiceChargeRepository,
    TimeCardRepository
} from "../repositories";
import { buildAddEmployeeTransaction } from "./addEmployee";
import { buildDeleteEmployeeTransaction } from "./deleteEmployee";
import { buildPostSalesReceiptTransaction } from "./postSalesReceipt";
import { buildPostServiceChargeTransaction } from "./postServiceCharge";
import { buildPostTimeCardTransaction } from "./postTimeCard";
import { Transactions } from "./Transactions";

export { Transactions } from "./Transactions";

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
        addEmployee: buildAddEmployeeTransaction({ employeeRepository }),
        deleteEmployee: buildDeleteEmployeeTransaction({ employeeRepository }),
        postTimeCard: buildPostTimeCardTransaction({ timeCardRepository, employeeRepository }),
        postSalesReceipt: buildPostSalesReceiptTransaction({
            salesReceiptRepository,
            employeeRepository
        }),
        postServiceCharge: buildPostServiceChargeTransaction({ serviceChargeRepository })
    };
}
