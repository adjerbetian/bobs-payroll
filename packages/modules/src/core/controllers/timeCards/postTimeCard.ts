import { buildValidator } from "@bobs-payroll/common";
import { CoreUseCases } from "../../domain";
import { Controllers } from "../Controllers";
import { RouteFormatError } from "../errors";

const transactionValidator = buildValidator(() => new RouteFormatError("TimeCard"));

export function makePostTimeCardController(useCases: CoreUseCases): Controllers["postTimeCard"] {
    return async function(employeeId, date, hours) {
        assertTransactionValid(employeeId, date, hours);

        await useCases.createTimeCard({
            employeeId: parseInt(employeeId),
            date: date,
            hours: parseFloat(hours)
        });
    };

    function assertTransactionValid(employeeId: string, date: string, hours: string): void {
        transactionValidator.assertIsNotEmpty(employeeId);
        transactionValidator.assertIsNotEmpty(date);
        transactionValidator.assertIsNotEmpty(hours);
        transactionValidator.assertIsISODate(date);
    }
}
