import { buildValidator } from "@payroll/common";
import { CoreUseCases } from "../../domain";
import { Controllers } from "../Controllers";
import { RouteFormatError } from "../errors";

const transactionValidator = buildValidator(() => new RouteFormatError("SalesReceipt"));

export function makePostSalesReceiptController(useCases: CoreUseCases): Controllers["postSalesReceipt"] {
    return async function(employeeId, date, amount) {
        assertTransactionIsValid();

        return useCases.createSalesReceipt({
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
