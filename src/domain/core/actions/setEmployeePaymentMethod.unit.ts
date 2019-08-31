import { buildStubPaymentMethodRepository, expect, generateHoldPaymentMethod, Stub } from "@test/unit";
import { PaymentMethodRepository } from "../repositories";
import { buildSetEmployeePaymentMethod, SetEmployeePaymentMethod } from "./setEmployeePaymentMethod";

describe("action setEmployeePaymentMethod", () => {
    let stubPaymentMethodRepository: Stub<PaymentMethodRepository>;
    let setEmployeePaymentMethod: SetEmployeePaymentMethod;

    beforeEach(() => {
        stubPaymentMethodRepository = buildStubPaymentMethodRepository();
        setEmployeePaymentMethod = buildSetEmployeePaymentMethod({
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
