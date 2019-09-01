import { expect, generateHoldPaymentMethod, generateIndex, Stub } from "@test/unit";
import { PaymentMethodRepository } from "../../repositories";
import { buildStubbedPaymentMethodRepository } from "../../test";
import { buildFetchEmployeePaymentMethod } from "./fetchEmployeePaymentMethod";

describe("action fetchEmployeePaymentMethod", () => {
    let stubbedPaymentMethodRepository: Stub<PaymentMethodRepository>;
    let fetchEmployeePaymentMethod: ReturnType<typeof buildFetchEmployeePaymentMethod>;

    beforeEach(() => {
        stubbedPaymentMethodRepository = buildStubbedPaymentMethodRepository();
        fetchEmployeePaymentMethod = buildFetchEmployeePaymentMethod({
            paymentMethodRepository: stubbedPaymentMethodRepository
        });
    });

    it("should return the employee payment method", async () => {
        const employeeId = generateIndex();
        const paymentMethod = generateHoldPaymentMethod({ employeeId });
        stubbedPaymentMethodRepository.fetchByEmployeeId.withArgs(employeeId).resolves(paymentMethod);

        const result = await fetchEmployeePaymentMethod(employeeId);

        expect(result).to.deep.equal(paymentMethod);
    });
});
