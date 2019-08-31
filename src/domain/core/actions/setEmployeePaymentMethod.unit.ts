import { expect, generateHoldPaymentMethod, Stub } from "@test/unit";
import { PaymentMethodRepository } from "../repositories";
import { buildStubbedPaymentMethodRepository } from "../test";
import { buildSetEmployeePaymentMethod, SetEmployeePaymentMethod } from "./setEmployeePaymentMethod";

describe("action setEmployeePaymentMethod", () => {
    let stubbedPaymentMethodRepository: Stub<PaymentMethodRepository>;
    let setEmployeePaymentMethod: SetEmployeePaymentMethod;

    beforeEach(() => {
        stubbedPaymentMethodRepository = buildStubbedPaymentMethodRepository();
        setEmployeePaymentMethod = buildSetEmployeePaymentMethod({
            paymentMethodRepository: stubbedPaymentMethodRepository
        });

        stubbedPaymentMethodRepository.insert.resolves();
        stubbedPaymentMethodRepository.deleteByEmployeeId.resolves();
    });

    it("should add the hold paycheck payment method to the employee", async () => {
        const paymentMethod = generateHoldPaymentMethod();

        await setEmployeePaymentMethod(paymentMethod);

        expect(stubbedPaymentMethodRepository.insert).to.have.been.calledOnceWith(paymentMethod);
    });
    it("should delete the previous payment method of the employee", async () => {
        const paymentMethod = generateHoldPaymentMethod();

        await setEmployeePaymentMethod(paymentMethod);

        expect(stubbedPaymentMethodRepository.deleteByEmployeeId).to.have.been.calledOnceWith(paymentMethod.employeeId);
        expect(stubbedPaymentMethodRepository.deleteByEmployeeId).to.have.been.calledBefore(
            stubbedPaymentMethodRepository.insert
        );
    });
});
