import { buildFakePaymentMethodRepository, Fake } from "../../../../../../test/fakeBuilders";
import { generateHoldPaymentMethod, generateIndex } from "../../../../../../test/generators";
import { expect } from "../../../../../../test/unitTest";
import { PaymentMethod } from "../../../entities";
import { NotFoundError } from "../../../errors";
import { PaymentMethodRepository } from "../../../repositories";
import { buildFetchEmployeePaymentMethod } from "./fetchEmployeePaymentMethod";

describe("fetchEmployeePaymentMethod", () => {
    let fetchEmployeePaymentMethod: (employeeId: number) => Promise<PaymentMethod>;
    let fakePaymentMethodRepository: Fake<PaymentMethodRepository>;

    beforeEach(() => {
        fakePaymentMethodRepository = buildFakePaymentMethodRepository();
        fetchEmployeePaymentMethod = buildFetchEmployeePaymentMethod(fakePaymentMethodRepository);
    });

    it("should return the employee payment method when it exists", async () => {
        const employeeId = generateIndex();
        const paymentMethod = generateHoldPaymentMethod();
        fakePaymentMethodRepository.fetchByEmployeeId.withArgs(employeeId).resolves(paymentMethod);

        const result = await fetchEmployeePaymentMethod(employeeId);

        expect(result).to.deep.equal(paymentMethod);
    });
    it("should return the hold payment method when the employee has not specified any payment method", async () => {
        const employeeId = generateIndex();
        fakePaymentMethodRepository.fetchByEmployeeId
            .withArgs(employeeId)
            .rejects(new NotFoundError("no payment method"));

        const result = await fetchEmployeePaymentMethod(employeeId);

        expect(result).to.deep.equal(generateHoldPaymentMethod({ employeeId }));
    });
});
