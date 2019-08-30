import { PaymentMethod, PaymentMethodType } from "../../../entities";
import { NotFoundError } from "../../../errors";
import { PaymentMethodRepository } from "../../../repositories";

export type FetchEmployeePaymentMethod = (employeeId: number) => Promise<PaymentMethod>;

export function buildFetchEmployeePaymentMethod(
    paymentMethodRepository: PaymentMethodRepository
): FetchEmployeePaymentMethod {
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
