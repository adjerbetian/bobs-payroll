import { Transaction } from "./Transactions";
import { EmployeeRepository } from "../repositories";
import { TransactionFormatError } from "../errors/TransactionFormatError";

export function buildDeleteEmployeeTransaction(
    employeeRepository: EmployeeRepository
): Transaction {
    return async function(employeeId: string): Promise<void> {
        if (!employeeId) {
            throw new TransactionFormatError("DelEmp");
        }

        await employeeRepository.deleteById(parseInt(employeeId));
    };
}
