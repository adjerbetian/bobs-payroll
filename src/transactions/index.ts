import { EmployeeRepository } from "../repositories";
import { buildAddEmployeeTransaction } from "./addEmployee";
import { Transactions } from "./Transactions";
import { buildDeleteEmployeeTransaction } from "./deleteEmployee";

export { Transactions } from "./Transactions";

export function buildTransactions(employeeRepository: EmployeeRepository): Transactions {
    return {
        addEmployee: buildAddEmployeeTransaction(employeeRepository),
        deleteEmployee: buildDeleteEmployeeTransaction(employeeRepository)
    };
}
