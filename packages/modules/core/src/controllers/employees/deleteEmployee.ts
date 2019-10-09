import { buildValidator } from "@payroll/common";
import { CoreUseCases } from "../../domain";
import { Controllers } from "../Controllers";
import { RouteFormatError } from "../errors";

const transactionValidator = buildValidator(() => new RouteFormatError("DelEmp"));

export function makeDeleteEmployeeController(useCases: CoreUseCases): Controllers["deleteEmployee"] {
    return async function(employeeId) {
        assertTransactionIsValid();
        await useCases.deleteEmployee(parseInt(employeeId));

        function assertTransactionIsValid(): void {
            transactionValidator.assertIsNotEmpty(employeeId);
        }
    };
}
