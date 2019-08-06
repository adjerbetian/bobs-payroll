import { Transaction } from "./Transactions";
import { EmployeeRepository } from "../repositories";
import { TransactionFormatError } from "../errors/TransactionFormatError";
import { assertIsNotEmpty } from "../common/utils";

interface Dependencies {
    employeeRepository: EmployeeRepository;
}

export function buildDeleteEmployeeTransaction({ employeeRepository }: Dependencies): Transaction {
    return async function(employeeId: string): Promise<void> {
        assertTransactionIsValid();
        await employeeRepository.deleteById(parseInt(employeeId));

        function assertTransactionIsValid(): void {
            try {
                assertIsNotEmpty(employeeId);
            } catch (err) {
                throw new TransactionFormatError("DelEmp");
            }
        }
    };
}
