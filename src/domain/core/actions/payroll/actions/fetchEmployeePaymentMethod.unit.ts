import { generateHoldPaymentMethod, generateIndex } from "../../../../../../test/generators";
import { buildStubPaymentMethodRepository, Stub } from "../../../../../../test/stubBuilders";
import { expect } from "../../../../../../test/unitTest";
import { NotFoundError } from "../../../errors";
import { PaymentMethodRepository } from "../../../repositories";
import { buildFetchEmployeePaymentMethod } from "./fetchEmployeePaymentMethod";

describe("fetchEmployeePaymentMethod", () => {
    let fetchEmployeePaymentMethod: ReturnType<typeof buildFetchEmployeePaymentMethod>;
    let stubPaymentMethodRepository: Stub<PaymentMethodRepository>;

    beforeEach(() => {
        stubPaymentMethodRepository = buildStubPaymentMethodRepository();
        fetchEmployeePaymentMethod = buildFetchEmployeePaymentMethod(stubPaymentMethodRepository);
    });

    it("should return the employee payment method when it exists", async () => {
        const employeeId = generateIndex();
        const paymentMethod = generateHoldPaymentMethod();
        stubPaymentMethodRepository.fetchByEmployeeId.withArgs(employeeId).resolves(paymentMethod);

        const result = await fetchEmployeePaymentMethod(employeeId);

        expect(result).to.deep.equal(paymentMethod);
    });
    it("should return the hold payment method when the employee has not specified any payment method", async () => {
        const employeeId = generateIndex();
        stubPaymentMethodRepository.fetchByEmployeeId
            .withArgs(employeeId)
            .rejects(new NotFoundError("no payment method"));

        const result = await fetchEmployeePaymentMethod(employeeId);

        expect(result).to.deep.equal(generateHoldPaymentMethod({ employeeId }));
    });
});
