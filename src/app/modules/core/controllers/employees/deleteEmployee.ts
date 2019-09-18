import { buildTransactionValidator } from "../../../../router";
import { CoreActions } from "../../domain";
import { Controllers } from "../Controllers";

const transactionValidator = buildTransactionValidator("DelEmp");

export function makeDeleteEmployeeController(actions: CoreActions): Controllers["deleteEmployee"] {
    return async function(employeeId) {
        assertTransactionIsValid();
        await actions.deleteEmployee(parseInt(employeeId));

        function assertTransactionIsValid(): void {
            transactionValidator.assertIsNotEmpty(employeeId);
        }
    };
}
