import { PaymentActions } from "../../../payment";
import { buildTransactionValidator } from "../utils";
import { Transactions } from "../processTransaction";

const transactionValidator = buildTransactionValidator("Payroll");

export function makeRunPayrollTransaction(actions: PaymentActions): Transactions["runPayroll"] {
    return async function(date: string): Promise<void> {
        transactionValidator.assertIsISODate(date);

        await actions.runPayroll(date);
    };
}
