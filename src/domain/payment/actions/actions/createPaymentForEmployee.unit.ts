import {
    expect,
    generateFloatBetween,
    generateHoldPaymentMethod,
    generateIndex,
    lastDayOfMonth,
    Stub
} from "@test/unit";
import { NotFoundError, PaymentMethodRepository } from "../../../core";
import { buildStubbedPaymentMethodRepository } from "../../../core/test";
import { Payment } from "../../entities";
import { PaymentRepository } from "../../repositories";
import { buildStubbedPaymentRepository } from "../../test";
import { buildCreatePaymentForEmployee } from "./createPaymentForEmployee";

describe("createPaymentForEmployee", () => {
    let createPaymentForEmployee: ReturnType<typeof buildCreatePaymentForEmployee>;
    let stubbedPaymentMethodRepository: Stub<PaymentMethodRepository>;
    let stubbedPaymentRepository: Stub<PaymentRepository>;

    beforeEach(() => {
        stubbedPaymentRepository = buildStubbedPaymentRepository();
        stubbedPaymentMethodRepository = buildStubbedPaymentMethodRepository();
        createPaymentForEmployee = buildCreatePaymentForEmployee({
            paymentRepository: stubbedPaymentRepository,
            paymentMethodRepository: stubbedPaymentMethodRepository
        });

        stubbedPaymentRepository.insert.resolves();
    });

    const employeeId = generateIndex();
    const date = lastDayOfMonth;
    const amount = generateFloatBetween(1000, 2000);

    it("should insert a payment with the given info", async () => {
        const method = generateHoldPaymentMethod({ employeeId });
        stubbedPaymentMethodRepository.fetchByEmployeeId.withArgs(employeeId).resolves(method);

        await createPaymentForEmployee({ employeeId, date, amount });

        expect(stubbedPaymentRepository.insert).to.have.been.calledOnce;
        expect(getInsertedPayment()).to.deep.include({ employeeId, date, amount });
    });

    it("should insert a payment with the existing employee payment method", async () => {
        const method = generateHoldPaymentMethod({ employeeId });
        stubbedPaymentMethodRepository.fetchByEmployeeId.withArgs(employeeId).resolves(method);

        await createPaymentForEmployee({ employeeId, date, amount });

        expect(getInsertedPayment().method).to.deep.equal(method);
    });

    it("should insert a payment with the hold payment method when the employee has to payment method", async () => {
        stubbedPaymentMethodRepository.fetchByEmployeeId
            .withArgs(employeeId)
            .rejects(new NotFoundError("no methods found"));

        await createPaymentForEmployee({ employeeId, date, amount });

        expect(getInsertedPayment().method).to.deep.equal(generateHoldPaymentMethod({ employeeId }));
    });

    function getInsertedPayment(): Payment {
        return stubbedPaymentRepository.insert.getCall(0).args[0];
    }
});
