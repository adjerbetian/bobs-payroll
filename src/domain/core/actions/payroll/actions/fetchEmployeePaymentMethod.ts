import { PaymentMethod, PaymentMethodType } from "../../../entities";
import { NotFoundError } from "../../../errors";
import { PaymentMethodRepository } from "../../../repositories";

export type FetchEmployeePaymentMethodAction = (employeeId: number) => Promise<PaymentMethod>;

export function buildFetchEmployeePaymentMethod(
    paymentMethodRepository: PaymentMethodRepository
): FetchEmployeePaymentMethodAction {
    return async function(employeeId: number) {
        try {
            return await paymentMethodRepository.fetchByEmployeeId(employeeId);
        } catch (err) {
            if (err instanceof NotFoundError) {
                return { type: PaymentMethodType.HOLD, employeeId };
            }
            throw err;
        }
    };
}
