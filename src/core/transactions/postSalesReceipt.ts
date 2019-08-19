import { EmployeeType, SalesReceipt } from "../entities";
import { EmployeeTypeError } from "../errors";
import { EmployeeRepository, SalesReceiptRepository } from "../repositories";
import { Transaction } from "./Transactions";
import { buildTransactionValidator } from "./transactionValidator";

interface Dependencies {
    salesReceiptRepository: SalesReceiptRepository;
    employeeRepository: EmployeeRepository;
}
const transactionValidator = buildTransactionValidator("SalesReceipt");

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
            transactionValidator.assertIsNotEmpty(employeeId);
            transactionValidator.assertIsNotEmpty(date);
            transactionValidator.assertIsNotEmpty(amount);
            transactionValidator.assertIsISODate(date);
        }
    };

    async function assertEmployeeIsCommissioned(employeeId: string): Promise<void> {
        const employee = await employeeRepository.fetchById(parseInt(employeeId));
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
