import { buildTransactionValidator } from "../../../../router";
import { CoreActions } from "../../domain";
import { Controllers } from "../Controllers";

const transactionValidator = buildTransactionValidator("SalesReceipt");

export function makePostSalesReceiptController(actions: CoreActions): Controllers["postSalesReceipt"] {
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
