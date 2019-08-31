import { CoreActions } from "../../core";
import { Transaction } from "../Transaction";
import { buildTransactionValidator } from "../utils";

const transactionValidator = buildTransactionValidator("DelEmp");

export function buildDeleteEmployeeTransaction(actions: CoreActions): Transaction {
    return async function(employeeId: string): Promise<void> {
        assertTransactionIsValid();
        await actions.deleteEmployee(parseInt(employeeId));

        function assertTransactionIsValid(): void {
            transactionValidator.assertIsNotEmpty(employeeId);
        }
    };
}
