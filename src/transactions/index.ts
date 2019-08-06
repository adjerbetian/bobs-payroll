import { EmployeeRepository } from "../repositories";
import { buildAddEmployeeTransaction } from "./addEmployee";
import { Transactions } from "./Transactions";
import { buildDeleteEmployeeTransaction } from "./deleteEmployee";
import { buildPostTimeCardTransaction } from "./postTimeCard";
import { timeCardRepository } from "../mongo";
import { buildPostSalesReceiptTransaction } from "./postSalesReceipt";
import { salesReceiptRepository } from "../mongo/salesReceiptRepository";
import { buildPostServiceChargeTransaction } from "./postServiceCharge";
import { serviceChargeRepository } from "../mongo/serviceChargeRepository";

export { Transactions } from "./Transactions";

export function buildTransactions(employeeRepository: EmployeeRepository): Transactions {
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
