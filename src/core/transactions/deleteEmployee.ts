import { EmployeeRepository } from "../repositories";
import { Transaction } from "./Transactions";
import { buildTransactionValidator } from "./transactionValidator";

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
