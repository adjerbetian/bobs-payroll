import { CoreActions } from "../../../domain";
import { Transactions } from "../../processTransaction";
import { buildTransactionValidator } from "../utils";

const transactionValidator = buildTransactionValidator("DelEmp");

export function makeDeleteEmployeeTransaction(actions: CoreActions): Transactions["deleteEmployee"] {
    return async function(employeeId) {
        assertTransactionIsValid();
        await actions.deleteEmployee(parseInt(employeeId));

        function assertTransactionIsValid(): void {
            transactionValidator.assertIsNotEmpty(employeeId);
        }
    };
}
