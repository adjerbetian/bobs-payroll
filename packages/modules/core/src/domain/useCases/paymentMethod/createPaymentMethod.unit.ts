import { expect, Stub } from "@infra/test";
import { generators } from "../../../test";
import { PaymentMethodRepository } from "../../repositories";
import { buildStubbedPaymentMethodRepository } from "../../test";
import { makeCreatePaymentMethod } from "./createPaymentMethod";

describe("use case - setEmployeePaymentMethod", () => {
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
        const paymentMethod = generators.generateHoldPaymentMethod();

        await createPaymentMethod({
            type: paymentMethod.getType(),
            employeeId: paymentMethod.getEmployeeId()
        });

        expect(stubbedPaymentMethodRepository.insert).to.have.been.calledOnceWithEntity(paymentMethod);
    });
    it("should add the direct paycheck payment method to the employee", async () => {
        const paymentMethod = generators.generateDirectPaymentMethod();

        await createPaymentMethod({
            type: paymentMethod.getType(),
            employeeId: paymentMethod.getEmployeeId(),
            account: paymentMethod.getAccount(),
            bank: paymentMethod.getBank()
        });

        expect(stubbedPaymentMethodRepository.insert).to.have.been.calledOnceWithEntity(paymentMethod);
    });
    it("should add the mail paycheck payment method to the employee", async () => {
        const paymentMethod = generators.generateMailPaymentMethod();

        await createPaymentMethod({
            type: paymentMethod.getType(),
            employeeId: paymentMethod.getEmployeeId(),
            address: paymentMethod.getAddress()
        });

        expect(stubbedPaymentMethodRepository.insert).to.have.been.calledOnceWithEntity(paymentMethod);
    });
    it("should delete the previous payment method of the employee", async () => {
        const paymentMethod = generators.generateHoldPaymentMethod();

        await createPaymentMethod({
            type: paymentMethod.getType(),
            employeeId: paymentMethod.getEmployeeId()
        });

        expect(stubbedPaymentMethodRepository.deleteByEmployeeId).to.have.been.calledOnceWith(
            paymentMethod.getEmployeeId()
        );
        expect(stubbedPaymentMethodRepository.deleteByEmployeeId).to.have.been.calledBefore(
            stubbedPaymentMethodRepository.insert
        );
    });
});
