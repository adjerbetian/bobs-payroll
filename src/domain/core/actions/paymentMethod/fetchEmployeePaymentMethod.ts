import { buildHoldPaymentMethod, PaymentMethod } from "../../entities";
import { NotFoundError } from "../../errors";
import { PaymentMethodRepository } from "../../repositories";
import { CorePaymentMethodActions } from "../CoreActions";

interface Dependencies {
    paymentMethodRepository: PaymentMethodRepository;
}

export function makeFetchEmployeePaymentMethod({
    paymentMethodRepository
}: Dependencies): CorePaymentMethodActions["fetchEmployeePaymentMethod"] {
    return async function(employeeId: number): Promise<PaymentMethod> {
        try {
            return await paymentMethodRepository.fetchByEmployeeId(employeeId);
        } catch (err) {
            if (err instanceof NotFoundError) {
                return buildHoldPaymentMethod({ employeeId });
            }
            throw err;
        }
    };
}
