import { EmployeeRepository } from "../../core";
import { Transaction } from "../Transaction";
import { buildTransactionValidator } from "../utils";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}
const transactionValidator = buildTransactionValidator("DelEmp");

export function buildDeleteEmployeeTransaction({ employeeRepository }: Dependencies): Transaction {
    return async function(employeeId: string): Promise<void> {
        assertTransactionIsValid();
        await employeeRepository.deleteById(parseInt(employeeId));

        function assertTransactionIsValid(): void {
            transactionValidator.assertIsNotEmpty(employeeId);
        }
    };
}
