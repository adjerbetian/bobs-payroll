import { buildHoldPaymentMethod } from "../../entities";
import { NotFoundError } from "../../errors";
import { PaymentMethodRepository } from "../../repositories";
import { CorePaymentMethodUseCases } from "../CoreUseCases";

interface Dependencies {
    paymentMethodRepository: PaymentMethodRepository;
}

export function makeFetchEmployeePaymentMethod({
    paymentMethodRepository
}: Dependencies): CorePaymentMethodUseCases["fetchEmployeePaymentMethod"] {
    return async function(employeeId) {
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
