import { lastDayOfMonth } from "@payroll/common";
import { CoreUseCases } from "@modules/core";
import { expect, generateFloatBetween, generateIndex, Stub } from "@infra/test";
import { buildStubbedCoreUseCases, generators } from "../../../test";
import { buildPayment, Payment } from "../../entities";
import { PaymentRepository } from "../../repositories";
import { buildStubbedPaymentRepository } from "../../test";
import { makeCreatePaymentForEmployee } from "./createPaymentForEmployee";

describe("createPaymentForEmployee", () => {
    let createPaymentForEmployee: ReturnType<typeof makeCreatePaymentForEmployee>;
    let stubbedCoreUseCases: Stub<CoreUseCases>;
    let stubbedPaymentRepository: Stub<PaymentRepository>;

    beforeEach(() => {
        stubbedPaymentRepository = buildStubbedPaymentRepository();
        stubbedCoreUseCases = buildStubbedCoreUseCases();
        createPaymentForEmployee = makeCreatePaymentForEmployee({
            paymentRepository: stubbedPaymentRepository,
            coreUseCases: stubbedCoreUseCases
        });

        stubbedPaymentRepository.insert.resolves();
    });

    const employeeId = generateIndex();
    const date = lastDayOfMonth;
    const amount = generateFloatBetween(1000, 2000);

    it("should insert a payment with the given info", async () => {
        const method = generators.generateHoldPaymentMethod({ employeeId });
        stubbedCoreUseCases.fetchEmployeePaymentMethod.withArgs(employeeId).resolves(method);

        await createPaymentForEmployee({ employeeId, date, amount });

        expect(stubbedPaymentRepository.insert).to.have.been.calledOnce;
        expect(getInsertedPayment()).entity.to.equal(
            buildPayment({
                employeeId,
                amount,
                date,
                method
            })
        );
    });

    function getInsertedPayment(): Payment {
        return stubbedPaymentRepository.insert.getCall(0).args[0];
    }
});
