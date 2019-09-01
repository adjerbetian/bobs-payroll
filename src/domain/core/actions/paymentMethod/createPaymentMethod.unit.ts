import { expect, generateHoldPaymentMethod, Stub } from "@test/unit";
import { PaymentMethodRepository } from "../../repositories";
import { buildStubbedPaymentMethodRepository } from "../../test";
import { buildCreatePaymentMethod } from "./createPaymentMethod";

describe("action setEmployeePaymentMethod", () => {
    let stubbedPaymentMethodRepository: Stub<PaymentMethodRepository>;
    let createPaymentMethod: ReturnType<typeof buildCreatePaymentMethod>;

    beforeEach(() => {
        stubbedPaymentMethodRepository = buildStubbedPaymentMethodRepository();
        createPaymentMethod = buildCreatePaymentMethod({
            paymentMethodRepository: stubbedPaymentMethodRepository
        });

        stubbedPaymentMethodRepository.insert.resolves();
        stubbedPaymentMethodRepository.deleteByEmployeeId.resolves();
    });

    it("should add the hold paycheck payment method to the employee", async () => {
        const paymentMethod = generateHoldPaymentMethod();

        await createPaymentMethod(paymentMethod);

        expect(stubbedPaymentMethodRepository.insert).to.have.been.calledOnceWith(paymentMethod);
    });
    it("should delete the previous payment method of the employee", async () => {
        const paymentMethod = generateHoldPaymentMethod();

        await createPaymentMethod(paymentMethod);

        expect(stubbedPaymentMethodRepository.deleteByEmployeeId).to.have.been.calledOnceWith(paymentMethod.employeeId);
        expect(stubbedPaymentMethodRepository.deleteByEmployeeId).to.have.been.calledBefore(
            stubbedPaymentMethodRepository.insert
        );
    });
});
