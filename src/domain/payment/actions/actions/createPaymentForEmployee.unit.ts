import {
    buildStubPaymentMethodRepository,
    buildStubPaymentRepository,
    expect,
    generateFloatBetween,
    generateHoldPaymentMethod,
    generateIndex,
    lastDayOfMonth,
    Stub
} from "@test/unit";
import { NotFoundError, PaymentMethodRepository } from "../../../core";
import { Payment } from "../../entities";
import { PaymentRepository } from "../../repositories";
import { buildCreatePaymentForEmployee } from "./createPaymentForEmployee";

describe("createPaymentForEmployee", () => {
    let createPaymentForEmployee: ReturnType<typeof buildCreatePaymentForEmployee>;
    let stubPaymentMethodRepository: Stub<PaymentMethodRepository>;
    let stubPaymentRepository: Stub<PaymentRepository>;

    beforeEach(() => {
        stubPaymentRepository = buildStubPaymentRepository();
        stubPaymentMethodRepository = buildStubPaymentMethodRepository();
        createPaymentForEmployee = buildCreatePaymentForEmployee({
            paymentRepository: stubPaymentRepository,
            paymentMethodRepository: stubPaymentMethodRepository
        });

        stubPaymentRepository.insert.resolves();
    });

    const employeeId = generateIndex();
    const date = lastDayOfMonth;
    const amount = generateFloatBetween(1000, 2000);

    it("should insert a payment with the given info", async () => {
        const method = generateHoldPaymentMethod({ employeeId });
        stubPaymentMethodRepository.fetchByEmployeeId.withArgs(employeeId).resolves(method);

        await createPaymentForEmployee({ employeeId, date, amount });

        expect(stubPaymentRepository.insert).to.have.been.calledOnce;
        expect(getInsertedPayment()).to.deep.include({ employeeId, date, amount });
    });

    it("should insert a payment with the existing employee payment method", async () => {
        const method = generateHoldPaymentMethod({ employeeId });
        stubPaymentMethodRepository.fetchByEmployeeId.withArgs(employeeId).resolves(method);

        await createPaymentForEmployee({ employeeId, date, amount });

        expect(getInsertedPayment().method).to.deep.equal(method);
    });

    it("should insert a payment with the hold payment method when the employee has to payment method", async () => {
        stubPaymentMethodRepository.fetchByEmployeeId
            .withArgs(employeeId)
            .rejects(new NotFoundError("no methods found"));

        await createPaymentForEmployee({ employeeId, date, amount });

        expect(getInsertedPayment().method).to.deep.equal(generateHoldPaymentMethod({ employeeId }));
    });

    function getInsertedPayment(): Payment {
        return stubPaymentRepository.insert.getCall(0).args[0];
    }
});
