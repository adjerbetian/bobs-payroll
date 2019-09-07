import {
    buildStubbedCoreActions,
    expect,
    generateFloatBetween,
    generateHoldPaymentMethod,
    generateIndex,
    lastDayOfMonth,
    Stub
} from "@test/unit";
import { CoreActions } from "../../../core";
import { Payment } from "../../entities";
import { PaymentRepository } from "../../repositories";
import { buildStubbedPaymentRepository } from "../../test";
import { makeCreatePaymentForEmployee } from "./createPaymentForEmployee";

describe("createPaymentForEmployee", () => {
    let createPaymentForEmployee: ReturnType<typeof makeCreatePaymentForEmployee>;
    let stubbedCoreActions: Stub<CoreActions>;
    let stubbedPaymentRepository: Stub<PaymentRepository>;

    beforeEach(() => {
        stubbedPaymentRepository = buildStubbedPaymentRepository();
        stubbedCoreActions = buildStubbedCoreActions();
        createPaymentForEmployee = makeCreatePaymentForEmployee({
            paymentRepository: stubbedPaymentRepository,
            coreActions: stubbedCoreActions
        });

        stubbedPaymentRepository.insert.resolves();
    });

    const employeeId = generateIndex();
    const date = lastDayOfMonth;
    const amount = generateFloatBetween(1000, 2000);

    it("should insert a payment with the given info", async () => {
        const method = generateHoldPaymentMethod({ employeeId });
        stubbedCoreActions.fetchEmployeePaymentMethod.withArgs(employeeId).resolves(method);

        await createPaymentForEmployee({ employeeId, date, amount });

        expect(stubbedPaymentRepository.insert).to.have.been.calledOnce;
        expect(getInsertedPayment()).to.deep.include({ employeeId, date, amount });
    });

    it("should insert a payment with the existing employee payment method", async () => {
        const method = generateHoldPaymentMethod({ employeeId });
        stubbedCoreActions.fetchEmployeePaymentMethod.withArgs(employeeId).resolves(method);

        await createPaymentForEmployee({ employeeId, date, amount });

        expect(getInsertedPayment().method).to.deep.equal(method);
    });

    function getInsertedPayment(): Payment {
        return stubbedPaymentRepository.insert.getCall(0).args[0];
    }
});
