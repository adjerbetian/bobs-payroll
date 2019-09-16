import { PaymentActions } from "../../../payment";
import { buildTransactionValidator } from "../utils";
import { Transactions } from "../processTransaction";

const transactionValidator = buildTransactionValidator("Payday");

export function makeRunPayrollTransaction(actions: PaymentActions): Transactions["runPayroll"] {
    return async function(date) {
        transactionValidator.assertIsISODate(date);

        await actions.runPayroll(date);
    };
}
