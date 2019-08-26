import { Actions, SalesReceipt } from "../../core";
import { Transaction } from "../Transaction";
import { buildTransactionValidator } from "../utils";

const transactionValidator = buildTransactionValidator("SalesReceipt");

export function buildPostSalesReceiptTransaction(actions: Actions): Transaction {
    return async function(employeeId: string, date: string, amount: string): Promise<void> {
        assertTransactionIsValid();

        const salesReceipt = buildSalesReceipt(employeeId, date, amount);
        return actions.createSalesReceipt(salesReceipt);

        function assertTransactionIsValid(): void {
            transactionValidator.assertIsNotEmpty(employeeId);
            transactionValidator.assertIsNotEmpty(date);
            transactionValidator.assertIsNotEmpty(amount);
            transactionValidator.assertIsISODate(date);
        }
    };

    function buildSalesReceipt(employeeId: string, date: string, amount: string): SalesReceipt {
        return {
            employeeId: parseInt(employeeId),
            date: date,
            amount: parseFloat(amount)
        };
    }
}
