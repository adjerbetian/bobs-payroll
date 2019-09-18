import { PaymentActions } from "../../../domain";
import { Controllers } from "../../Controllers";
import { buildTransactionValidator } from "../../utils";

const transactionValidator = buildTransactionValidator("Payday");

export function makeRunPayrollTransaction(actions: PaymentActions): Controllers["runPayroll"] {
    return async function(date) {
        transactionValidator.assertIsISODate(date);

        await actions.runPayroll(date);
    };
}
