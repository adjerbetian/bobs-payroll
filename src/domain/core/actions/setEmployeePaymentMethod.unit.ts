import { buildFakePaymentMethodRepository, Fake } from "../../../../test/fakeBuilders";
import { generateHoldPaymentMethod } from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { PaymentMethodRepository } from "../repositories";
import { buildSetEmployeePaymentMethodAction, SetEmployeePaymentMethodAction } from "./setEmployeePaymentMethod";

describe("action setEmployeePaymentMethod", () => {
    let fakePaymentMethodRepository: Fake<PaymentMethodRepository>;
    let setEmployeePaymentMethod: SetEmployeePaymentMethodAction;

    beforeEach(() => {
        fakePaymentMethodRepository = buildFakePaymentMethodRepository();
        setEmployeePaymentMethod = buildSetEmployeePaymentMethodAction({
            paymentMethodRepository: fakePaymentMethodRepository
        });

        fakePaymentMethodRepository.insert.resolves();
        fakePaymentMethodRepository.deleteByEmployeeId.resolves();
    });

    it("should add the hold paycheck payment method to the employee", async () => {
        const paymentMethod = generateHoldPaymentMethod();

        await setEmployeePaymentMethod(paymentMethod);

        expect(fakePaymentMethodRepository.insert).to.have.been.calledOnceWith(paymentMethod);
    });
    it("should delete the previous payment method of the employee", async () => {
        const paymentMethod = generateHoldPaymentMethod();

        await setEmployeePaymentMethod(paymentMethod);

        expect(fakePaymentMethodRepository.deleteByEmployeeId).to.have.been.calledOnceWith(paymentMethod.employeeId);
        expect(fakePaymentMethodRepository.deleteByEmployeeId).to.have.been.calledBefore(
            fakePaymentMethodRepository.insert
        );
    });
});
