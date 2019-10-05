import { buildValidator } from "@bobs-payroll/common";
import { CoreUseCases } from "../../domain";
import { Controllers } from "../Controllers";
import { RouteFormatError } from "../errors";

const transactionValidator = buildValidator(() => new RouteFormatError("ServiceCharge"));

export function makePostServiceChargeController(useCases: CoreUseCases): Controllers["postServiceCharge"] {
    return async function(memberId, amount) {
        assertTransactionValid(memberId, amount);

        await useCases.createServiceCharge({
            memberId,
            amount: parseFloat(amount)
        });
    };

    function assertTransactionValid(memberId: string, amount: string): void {
        transactionValidator.assertIsNotEmpty(memberId);
        transactionValidator.assertIsNotEmpty(amount);
    }
}
