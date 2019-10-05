import { buildTransactionValidator } from "@bobs-payroll/router";
import { PaymentUseCases } from "../../domain";
import { Controllers } from "../Controllers";

const transactionValidator = buildTransactionValidator("Payday");

export function makeRunPayrollController(useCases: PaymentUseCases): Controllers["runPayroll"] {
    return async function(date) {
        transactionValidator.assertIsISODate(date);

        await useCases.runPayroll(date);
    };
}
