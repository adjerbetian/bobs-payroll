import {
    buildStubPaymentRepository,
    expect,
    generateFloatBetween,
    generateHoldPaymentMethod,
    generateIndex,
    generatePayment,
    lastDayOfMonth,
    Stub
} from "@test/unit";
import { buildStubFor } from "@test/utils/stubBuilders";
import { PaymentRepository } from "../../../repositories";
import { FetchEmployeePaymentMethodAction } from "../FetchEmployeePaymentMethodAction";
import { buildCreatePaymentForEmployee } from "./createPaymentForEmployee";

describe("createPaymentForEmployee", () => {
    let createPaymentForEmployee: ReturnType<typeof buildCreatePaymentForEmployee>;
    let stubPaymentRepository: Stub<PaymentRepository>;
    let stubFetchEmployeePaymentMethod: Stub<FetchEmployeePaymentMethodAction>;

    beforeEach(() => {
        stubFetchEmployeePaymentMethod = buildStubFor("fetchEmployeePaymentMethod");
        stubPaymentRepository = buildStubPaymentRepository();
        createPaymentForEmployee = buildCreatePaymentForEmployee({
            paymentRepository: stubPaymentRepository,
            fetchEmployeePaymentMethod: stubFetchEmployeePaymentMethod
        });

        stubPaymentRepository.insert.resolves();
    });

    it("should insert a payment with the right employee method", async () => {
        const employeeId = generateIndex();
        const date = lastDayOfMonth;
        const amount = generateFloatBetween(1000, 2000);
        const method = generateHoldPaymentMethod();
        stubFetchEmployeePaymentMethod.withArgs(employeeId).resolves(method);

        await createPaymentForEmployee({ employeeId, date, amount });

        expect(stubPaymentRepository.insert).to.have.been.calledOnceWith(
            generatePayment({ employeeId, date, amount, method })
        );
    });
});
