import { assertIsNotEmpty } from "../common/utils";
import { TransactionFormatError } from "../errors";
import { EmployeeRepository } from "../repositories";
import { Transaction } from "./Transactions";

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
