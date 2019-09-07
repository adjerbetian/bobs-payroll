import { CoreActions } from "../../../core";
import { buildTransactionValidator } from "../utils";
import { Transactions } from "../processTransaction";

const transactionValidator = buildTransactionValidator("DelEmp");

export function makeDeleteEmployeeTransaction(actions: CoreActions): Transactions["deleteEmployee"] {
    return async function(employeeId: string): Promise<void> {
        assertTransactionIsValid();
        await actions.deleteEmployee(parseInt(employeeId));

        function assertTransactionIsValid(): void {
            transactionValidator.assertIsNotEmpty(employeeId);
        }
    };
}
