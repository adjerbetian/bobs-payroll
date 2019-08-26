import { Actions, TimeCard } from "../../core";
import { Transaction } from "../Transaction";
import { buildTransactionValidator } from "../utils";

const transactionValidator = buildTransactionValidator("TimeCard");

export function buildPostTimeCardTransaction(actions: Actions): Transaction {
    return async function(employeeId: string, date: string, hours: string): Promise<void> {
        assertTransactionValid(employeeId, date, hours);

        const timeCard = buildTimeCard(employeeId, date, hours);
        await actions.createTimeCard(timeCard);
    };

    function assertTransactionValid(employeeId: string, date: string, hours: string): void {
        transactionValidator.assertIsNotEmpty(employeeId);
        transactionValidator.assertIsNotEmpty(date);
        transactionValidator.assertIsNotEmpty(hours);
        transactionValidator.assertIsISODate(date);
    }

    function buildTimeCard(employeeId: string, date: string, hours: string): TimeCard {
        return {
            employeeId: parseInt(employeeId),
            date: date,
            hours: parseFloat(hours)
        };
    }
}
