import { CoreActions, ServiceCharge } from "../../core";
import { Transaction } from "../Transaction";
import { buildTransactionValidator } from "../utils";

const transactionValidator = buildTransactionValidator("ServiceCharge");

export function buildPostServiceChargeTransaction(actions: CoreActions): Transaction {
    return async function(memberId: string, amount: string): Promise<void> {
        assertTransactionValid(memberId, amount);

        const serviceCharge = buildServiceCharge(memberId, amount);
        await actions.createServiceCharge(serviceCharge);
    };

    function assertTransactionValid(memberId: string, amount: string): void {
        transactionValidator.assertIsNotEmpty(memberId);
        transactionValidator.assertIsNotEmpty(amount);
    }

    function buildServiceCharge(memberId: string, amount: string): ServiceCharge {
        return {
            memberId: memberId,
            amount: parseFloat(amount)
        };
    }
}
