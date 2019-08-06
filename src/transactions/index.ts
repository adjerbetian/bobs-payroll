import { EmployeeRepository } from "../repositories";
import { buildAddEmployeeTransaction } from "./addEmployee";
import { Transactions } from "./Transactions";
import { buildDeleteEmployeeTransaction } from "./deleteEmployee";
import { buildPostTimeCardTransaction } from "./postTimeCard";
import { salesReceiptRepository, serviceChargeRepository, timeCardRepository } from "../mongo";
import { buildPostSalesReceiptTransaction } from "./postSalesReceipt";
import { buildPostServiceChargeTransaction } from "./postServiceCharge";

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
