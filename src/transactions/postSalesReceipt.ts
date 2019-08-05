import { Transaction } from "./Transactions";
import { EmployeeRepository, SalesReceiptRepository } from "../repositories";
import { EmployeeType } from "../entities/Employee";
import { EmployeeTypeError } from "../errors";
import { assertIsISODate, assertIsNotEmpty } from "../common/utils";
import { TransactionFormatError } from "../errors/TransactionFormatError";

export function buildPostSalesReceiptTransaction({
    salesReceiptRepository,
    employeeRepository
}: {
    salesReceiptRepository: SalesReceiptRepository;
    employeeRepository: EmployeeRepository;
}): Transaction {
    return async function(employeeId: string, date: string, amount: string): Promise<void> {
        assertTransactionIsValid();
        await assertEmployeeIsCommissioned(parseInt(employeeId));

        return salesReceiptRepository.insertOne({
            employeeId: parseInt(employeeId),
            date: date,
            amount: parseFloat(amount)
        });

        function assertTransactionIsValid(): void {
            try {
                assertIsNotEmpty(employeeId);
                assertIsNotEmpty(date);
                assertIsNotEmpty(amount);
                assertIsISODate(date);
            } catch (err) {
                throw new TransactionFormatError("SalesReceipt");
            }
        }
    };

    async function assertEmployeeIsCommissioned(employeeId: number): Promise<void> {
        const employee = await employeeRepository.fetchEmployeeById(employeeId);
        if (employee.type !== EmployeeType.MONTHLY_SALARY || !employee.commissionRate) {
            throw new EmployeeTypeError(employee, EmployeeType.MONTHLY_SALARY);
        }
    }
}
