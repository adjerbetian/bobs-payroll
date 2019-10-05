import { buildValidator } from "@bobs-payroll/common";
import { PaymentUseCases } from "../../domain";
import { Controllers } from "../Controllers";
import { RouteFormatError } from "../errors";

const transactionValidator = buildValidator(() => new RouteFormatError("Payday"));

export function makeRunPayrollController(useCases: PaymentUseCases): Controllers["runPayroll"] {
    return async function(date) {
        transactionValidator.assertIsISODate(date);

        await useCases.runPayroll(date);
    };
}
