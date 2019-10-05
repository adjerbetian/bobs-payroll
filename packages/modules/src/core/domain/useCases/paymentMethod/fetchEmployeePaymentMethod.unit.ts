import { expect, generateIndex, Stub } from "@bobs-payroll/test";
import { generators } from "../../../../test";
import { NotFoundError } from "../../errors";
import { PaymentMethodRepository } from "../../repositories";
import { buildStubbedPaymentMethodRepository } from "../../test";
import { makeFetchEmployeePaymentMethod } from "./fetchEmployeePaymentMethod";

describe("use case - fetchEmployeePaymentMethod", () => {
    let stubbedPaymentMethodRepository: Stub<PaymentMethodRepository>;
    let fetchEmployeePaymentMethod: ReturnType<typeof makeFetchEmployeePaymentMethod>;

    beforeEach(() => {
        stubbedPaymentMethodRepository = buildStubbedPaymentMethodRepository();
        fetchEmployeePaymentMethod = makeFetchEmployeePaymentMethod({
            paymentMethodRepository: stubbedPaymentMethodRepository
        });
    });

    it("should return the employee payment method", async () => {
        const employeeId = generateIndex();
        const paymentMethod = generators.generateHoldPaymentMethod({ employeeId });
        stubbedPaymentMethodRepository.fetchByEmployeeId.withArgs(employeeId).resolves(paymentMethod);

        const result = await fetchEmployeePaymentMethod(employeeId);

        expect(result).to.deep.equal(paymentMethod);
    });

    it("should return the hold payment method when the employee has to payment method", async () => {
        const employeeId = generateIndex();
        stubbedPaymentMethodRepository.fetchByEmployeeId
            .withArgs(employeeId)
            .rejects(new NotFoundError("no payment method found"));

        const result = await fetchEmployeePaymentMethod(employeeId);

        expect(result).entity.to.equal(generators.generateHoldPaymentMethod({ employeeId }));
    });
});
