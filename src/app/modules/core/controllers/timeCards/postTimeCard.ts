import { buildTransactionValidator } from "../../../../router";
import { CoreActions } from "../../domain";
import { Controllers } from "../Controllers";

const transactionValidator = buildTransactionValidator("TimeCard");

export function makePostTimeCardController(actions: CoreActions): Controllers["postTimeCard"] {
    return async function(employeeId, date, hours) {
        assertTransactionValid(employeeId, date, hours);

        await actions.createTimeCard({
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