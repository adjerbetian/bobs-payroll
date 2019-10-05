import { buildTransactionValidator } from "@bobs-payroll/router";
import { CoreUseCases } from "../../domain";
import { Controllers } from "../Controllers";

const transactionValidator = buildTransactionValidator("DelEmp");

export function makeDeleteEmployeeController(useCases: CoreUseCases): Controllers["deleteEmployee"] {
    return async function(employeeId) {
        assertTransactionIsValid();
        await useCases.deleteEmployee(parseInt(employeeId));

        function assertTransactionIsValid(): void {
            transactionValidator.assertIsNotEmpty(employeeId);
        }
    };
}
