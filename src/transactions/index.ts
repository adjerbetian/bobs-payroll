import { salesReceiptRepository, serviceChargeRepository, timeCardRepository } from "../mongo";
import { EmployeeRepository } from "../repositories";
import { buildAddEmployeeTransaction } from "./addEmployee";
import { buildDeleteEmployeeTransaction } from "./deleteEmployee";
import { buildPostSalesReceiptTransaction } from "./postSalesReceipt";
import { buildPostServiceChargeTransaction } from "./postServiceCharge";
import { buildPostTimeCardTransaction } from "./postTimeCard";
import { Transactions } from "./Transactions";

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
