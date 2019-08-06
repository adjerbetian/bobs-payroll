import { Transaction } from "./Transactions";
import { EmployeeRepository, SalesReceiptRepository } from "../repositories";
import { EmployeeType } from "../entities/Employee";
import { EmployeeTypeError } from "../errors";
import { assertIsISODate, assertIsNotEmpty } from "../common/utils";
import { TransactionFormatError } from "../errors/TransactionFormatError";
import { SalesReceipt } from "../entities";

interface Dependencies {
    salesReceiptRepository: SalesReceiptRepository;
    employeeRepository: EmployeeRepository;
}

export function buildPostSalesReceiptTransaction({
    salesReceiptRepository,
    employeeRepository
}: Dependencies): Transaction {
    return async function(employeeId: string, date: string, amount: string): Promise<void> {
        assertTransactionIsValid();
        await assertEmployeeIsCommissioned(employeeId);

        const salesReceipt = buildSalesReceipt(employeeId, date, amount);
        return salesReceiptRepository.insertOne(salesReceipt);

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

    async function assertEmployeeIsCommissioned(employeeId: string): Promise<void> {
        const employee = await employeeRepository.fetchEmployeeById(parseInt(employeeId));
        if (employee.type !== EmployeeType.COMMISSIONED) {
            throw new EmployeeTypeError(employee, EmployeeType.COMMISSIONED);
        }
    }

    function buildSalesReceipt(employeeId: string, date: string, amount: string): SalesReceipt {
        return {
            employeeId: parseInt(employeeId),
            date: date,
            amount: parseFloat(amount)
        };
    }
}
