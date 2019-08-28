import { Actions } from "../../core";
import { Transaction } from "../Transaction";
import { buildTransactionValidator } from "../utils";

const transactionValidator = buildTransactionValidator("Payroll");

export function buildRunPayrollTransaction(actions: Actions): Transaction {
    return async function(date: string): Promise<void> {
        transactionValidator.assertIsISODate(date);

        await actions.runPayroll(date);
    };
}
