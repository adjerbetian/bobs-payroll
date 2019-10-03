import {
    buildDirectPaymentMethod,
    buildHoldPaymentMethod,
    buildMailPaymentMethod,
    PaymentMethod,
    PaymentMethodType
} from "../../entities";
import { InvalidObject } from "../../errors";
import { PaymentMethodRepository } from "../../repositories";
import { PaymentMethodCreationModel } from "../../requestModels";
import { CorePaymentMethodUseCases } from "../CoreUseCases";

interface Dependencies {
    paymentMethodRepository: PaymentMethodRepository;
}

export function makeCreatePaymentMethod({
    paymentMethodRepository
}: Dependencies): CorePaymentMethodUseCases["createPaymentMethod"] {
    return async function(creationModel) {
        await paymentMethodRepository.deleteByEmployeeId(creationModel.employeeId);

        const paymentMethod = buildPaymentMethod(creationModel);
        return paymentMethodRepository.insert(paymentMethod);
    };

    function buildPaymentMethod(creationModel: PaymentMethodCreationModel): PaymentMethod {
        if (creationModel.type === PaymentMethodType.HOLD) {
            return buildHoldPaymentMethod(creationModel);
        }
        if (creationModel.type === PaymentMethodType.DIRECT) {
            return buildDirectPaymentMethod(creationModel);
        }
        if (creationModel.type === PaymentMethodType.MAIL) {
            return buildMailPaymentMethod(creationModel);
        }
        throw new InvalidObject(creationModel);
    }
}
