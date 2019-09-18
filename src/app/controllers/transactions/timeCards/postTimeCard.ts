import { buildTimeCard, CoreActions } from "../../../domain";
import { Transactions } from "../../processTransaction";
import { buildTransactionValidator } from "../utils";

const transactionValidator = buildTransactionValidator("TimeCard");

export function makePostTimeCardTransaction(actions: CoreActions): Transactions["postTimeCard"] {
    return async function(employeeId, date, hours) {
        assertTransactionValid(employeeId, date, hours);

        const timeCard = buildTimeCard({
            employeeId: parseInt(employeeId),
            date: date,
            hours: parseFloat(hours)
        });
        await actions.createTimeCard(timeCard);
    };

    function assertTransactionValid(employeeId: string, date: string, hours: string): void {
        transactionValidator.assertIsNotEmpty(employeeId);
        transactionValidator.assertIsNotEmpty(date);
        transactionValidator.assertIsNotEmpty(hours);
        transactionValidator.assertIsISODate(date);
    }
}
