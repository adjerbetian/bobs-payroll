import { CoreActions } from "../../../domain";
import { Controllers } from "../../Controllers";
import { buildTransactionValidator } from "../utils";

const transactionValidator = buildTransactionValidator("DelEmp");

export function makeDeleteEmployeeTransaction(actions: CoreActions): Controllers["deleteEmployee"] {
    return async function(employeeId) {
        assertTransactionIsValid();
        await actions.deleteEmployee(parseInt(employeeId));

        function assertTransactionIsValid(): void {
            transactionValidator.assertIsNotEmpty(employeeId);
        }
    };
}
