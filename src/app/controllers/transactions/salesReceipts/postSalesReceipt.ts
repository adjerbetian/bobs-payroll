import { CoreActions } from "../../../domain";
import { Controllers } from "../../Controllers";
import { buildTransactionValidator } from "../utils";

const transactionValidator = buildTransactionValidator("SalesReceipt");

export function makePostSalesReceiptTransaction(actions: CoreActions): Controllers["postSalesReceipt"] {
    return async function(employeeId, date, amount) {
        assertTransactionIsValid();

        return actions.createSalesReceipt({
            employeeId: parseInt(employeeId),
            date,
            amount: parseFloat(amount)
        });

        function assertTransactionIsValid(): void {
            transactionValidator.assertIsNotEmpty(employeeId);
            transactionValidator.assertIsNotEmpty(date);
            transactionValidator.assertIsNotEmpty(amount);
            transactionValidator.assertIsISODate(date);
        }
    };
}
