import { buildTransactionValidator } from "../../../../router";
import { PaymentActions } from "../../domain";
import { Controllers } from "../Controllers";

const transactionValidator = buildTransactionValidator("Payday");

export function makeRunPayrollController(actions: PaymentActions): Controllers["runPayroll"] {
    return async function(date) {
        transactionValidator.assertIsISODate(date);

        await actions.runPayroll(date);
    };
}
