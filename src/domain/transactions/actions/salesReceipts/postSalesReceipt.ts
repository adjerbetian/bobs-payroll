import { buildSalesReceipt, CoreActions } from "../../../core";
import { Transactions } from "../processTransaction";
import { buildTransactionValidator } from "../utils";

const transactionValidator = buildTransactionValidator("SalesReceipt");

export function makePostSalesReceiptTransaction(actions: CoreActions): Transactions["postSalesReceipt"] {
    return async function(employeeId, date, amount) {
        assertTransactionIsValid();

        const salesReceipt = buildSalesReceipt({
            employeeId: parseInt(employeeId),
            date,
            amount: parseFloat(amount)
        });
        return actions.createSalesReceipt(salesReceipt);

        function assertTransactionIsValid(): void {
            transactionValidator.assertIsNotEmpty(employeeId);
            transactionValidator.assertIsNotEmpty(date);
            transactionValidator.assertIsNotEmpty(amount);
            transactionValidator.assertIsISODate(date);
        }
    };
}
