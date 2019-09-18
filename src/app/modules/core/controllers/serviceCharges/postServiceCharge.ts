import { buildTransactionValidator } from "../../../../router";
import { CoreActions } from "../../domain";
import { Controllers } from "../Controllers";

const transactionValidator = buildTransactionValidator("ServiceCharge");

export function makePostServiceChargeController(actions: CoreActions): Controllers["postServiceCharge"] {
    return async function(memberId, amount) {
        assertTransactionValid(memberId, amount);

        await actions.createServiceCharge({
            memberId,
            amount: parseFloat(amount)
        });
    };

    function assertTransactionValid(memberId: string, amount: string): void {
        transactionValidator.assertIsNotEmpty(memberId);
        transactionValidator.assertIsNotEmpty(amount);
    }
}
