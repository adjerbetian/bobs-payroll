import { Transaction } from "./Transactions";
import { EmployeeRepository } from "../repositories";

export function buildDeleteEmployeeTransaction(
    employeeRepository: EmployeeRepository
): Transaction {
    return async function(employeeId: string): Promise<void> {
        await employeeRepository.deleteById(parseInt(employeeId));
    };
}
