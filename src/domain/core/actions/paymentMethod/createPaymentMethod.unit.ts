import { entityGenerators, expect, Stub } from "@test/unit";
import { PaymentMethodRepository } from "../../repositories";
import { buildStubbedPaymentMethodRepository } from "../../test";
import { makeCreatePaymentMethod } from "./createPaymentMethod";

describe("action setEmployeePaymentMethod", () => {
    let stubbedPaymentMethodRepository: Stub<PaymentMethodRepository>;
    let createPaymentMethod: ReturnType<typeof makeCreatePaymentMethod>;

    beforeEach(() => {
        stubbedPaymentMethodRepository = buildStubbedPaymentMethodRepository();
        createPaymentMethod = makeCreatePaymentMethod({
            paymentMethodRepository: stubbedPaymentMethodRepository
        });

        stubbedPaymentMethodRepository.insert.resolves();
        stubbedPaymentMethodRepository.deleteByEmployeeId.resolves();
    });

    it("should add the hold paycheck payment method to the employee", async () => {
        const paymentMethod = entityGenerators.generateHoldPaymentMethod();

        await createPaymentMethod(paymentMethod);

        expect(stubbedPaymentMethodRepository.insert).to.have.been.calledOnceWith(paymentMethod);
    });
    it("should delete the previous payment method of the employee", async () => {
        const paymentMethod = entityGenerators.generateHoldPaymentMethod();

        await createPaymentMethod(paymentMethod);

        expect(stubbedPaymentMethodRepository.deleteByEmployeeId).to.have.been.calledOnceWith(
            paymentMethod.getEmployeeId()
        );
        expect(stubbedPaymentMethodRepository.deleteByEmployeeId).to.have.been.calledBefore(
            stubbedPaymentMethodRepository.insert
        );
    });
});
