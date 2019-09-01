import { PaymentMethod } from "../../entities";
import { PaymentMethodRepository } from "../../repositories";
import { CorePaymentMethodActions } from "../CoreActions";

interface Dependencies {
    paymentMethodRepository: PaymentMethodRepository;
}

export function buildFetchEmployeePaymentMethod({
    paymentMethodRepository
}: Dependencies): CorePaymentMethodActions["fetchEmployeePaymentMethod"] {
    return async function(employeeId: number): Promise<PaymentMethod> {
        return paymentMethodRepository.fetchByEmployeeId(employeeId);
    };
}
