import { expect, generateIndex } from "@payroll/test";
import { generators, seeders } from "../../test";
import { NotFoundError, PaymentMethod } from "../../domain";
import { dbPaymentMethods } from "../collections";
import { makeMongoPaymentMethodRepository } from "./mongoPaymentMethodRepository";

describe("mongoPaymentMethodRepository", () => {
    let repository: ReturnType<typeof makeMongoPaymentMethodRepository>;

    beforeEach(() => {
        repository = makeMongoPaymentMethodRepository(dbPaymentMethods);
    });

    describe("fetchByEmployeeId", () => {
        it("should return the hold paymentMethod matching the employee id", async () => {
            const paymentMethod = await seeders.seedHoldPaymentMethod();
            await expectEmployeeMethodToEqual(paymentMethod.getEmployeeId(), paymentMethod);
        });
        it("should return the direct paymentMethod matching the employee id", async () => {
            const paymentMethod = await seeders.seedDirectPaymentMethod();
            await expectEmployeeMethodToEqual(paymentMethod.getEmployeeId(), paymentMethod);
        });
        it("should return the mail paymentMethod matching the employee id", async () => {
            const paymentMethod = await seeders.seedMailPaymentMethod();
            await expectEmployeeMethodToEqual(paymentMethod.getEmployeeId(), paymentMethod);
        });

        async function expectEmployeeMethodToEqual(employeeId: number, paymentMethod: PaymentMethod): Promise<void> {
            const dbPaymentMethod = await repository.fetchByEmployeeId(employeeId);
            expect(dbPaymentMethod).entity.to.equal(paymentMethod);
        }
    });
    describe("deleteByEmployeeId", () => {
        it("should delete the payment method of the employee", async () => {
            const paymentMethod = await seeders.seedHoldPaymentMethod();

            await repository.deleteByEmployeeId(paymentMethod.getEmployeeId());

            const promise = repository.fetchByEmployeeId(paymentMethod.getEmployeeId());
            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
        it("should do nothing when the employee did't have any payment method", async () => {
            const promise = repository.deleteByEmployeeId(generateIndex());

            await expect(promise).to.be.fulfilled;
        });
    });
    describe("insert", () => {
        it("should insert the hold payment method", async () => {
            const paymentMethod = generators.generateHoldPaymentMethod();
            await assertPaymentMethodCanBeInserted(paymentMethod);
        });
        it("should insert the direct payment method", async () => {
            const paymentMethod = generators.generateDirectPaymentMethod();
            await assertPaymentMethodCanBeInserted(paymentMethod);
        });
        it("should insert the mail payment method", async () => {
            const paymentMethod = generators.generateMailPaymentMethod();
            await assertPaymentMethodCanBeInserted(paymentMethod);
        });

        async function assertPaymentMethodCanBeInserted(paymentMethod: PaymentMethod): Promise<void> {
            await repository.insert(paymentMethod);

            const dbPaymentMethod = await repository.fetchByEmployeeId(paymentMethod.getEmployeeId());
            expect(dbPaymentMethod).entity.to.equal(paymentMethod);
        }
    });
});
