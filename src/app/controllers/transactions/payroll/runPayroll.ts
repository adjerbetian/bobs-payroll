import { PaymentActions } from "../../../domain";
import { Transactions } from "../../processTransaction";
import { buildTransactionValidator } from "../utils";

const transactionValidator = buildTransactionValidator("Payday");

export function makeRunPayrollTransaction(actions: PaymentActions): Transactions["runPayroll"] {
    return async function(date) {
        transactionValidator.assertIsISODate(date);

        await actions.runPayroll(date);
    };
}
