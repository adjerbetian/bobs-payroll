import { PaymentActions } from "../../payment";
import { Transaction } from "../Transaction";
import { buildTransactionValidator } from "../utils";

const transactionValidator = buildTransactionValidator("Payroll");

export function buildRunPayrollTransaction(actions: PaymentActions): Transaction {
    return async function(date: string): Promise<void> {
        transactionValidator.assertIsISODate(date);

        await actions.runPayroll(date);
    };
}
