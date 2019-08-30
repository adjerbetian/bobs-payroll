import { buildStubPaymentMethodRepository, Stub } from "../../../../test/stubBuilders";
import { generateHoldPaymentMethod } from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { PaymentMethodRepository } from "../repositories";
import { buildSetEmployeePaymentMethodAction, SetEmployeePaymentMethodAction } from "./setEmployeePaymentMethod";

describe("action setEmployeePaymentMethod", () => {
    let stubPaymentMethodRepository: Stub<PaymentMethodRepository>;
    let setEmployeePaymentMethod: SetEmployeePaymentMethodAction;

    beforeEach(() => {
        stubPaymentMethodRepository = buildStubPaymentMethodRepository();
        setEmployeePaymentMethod = buildSetEmployeePaymentMethodAction({
            paymentMethodRepository: stubPaymentMethodRepository
        });

        stubPaymentMethodRepository.insert.resolves();
        stubPaymentMethodRepository.deleteByEmployeeId.resolves();
    });

    it("should add the hold paycheck payment method to the employee", async () => {
        const paymentMethod = generateHoldPaymentMethod();

        await setEmployeePaymentMethod(paymentMethod);

        expect(stubPaymentMethodRepository.insert).to.have.been.calledOnceWith(paymentMethod);
    });
    it("should delete the previous payment method of the employee", async () => {
        const paymentMethod = generateHoldPaymentMethod();

        await setEmployeePaymentMethod(paymentMethod);

        expect(stubPaymentMethodRepository.deleteByEmployeeId).to.have.been.calledOnceWith(paymentMethod.employeeId);
        expect(stubPaymentMethodRepository.deleteByEmployeeId).to.have.been.calledBefore(
            stubPaymentMethodRepository.insert
        );
    });
});
