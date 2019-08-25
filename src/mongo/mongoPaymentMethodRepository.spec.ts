import { generateDirectPaymentMethod } from "../../test/generators";
import "../../test/integrationTest";
import { expect } from "../../test/unitTest";
import { NotFoundError } from "../domain";
import { mongoPaymentMethodRepository } from "./mongoPaymentMethodRepository";

describe("mongoPaymentMethodRepository", () => {
    describe("fetchByEmployeeId", () => {
        it("should return the paymentMethod matching the employee id", async () => {
            const paymentMethod = generateDirectPaymentMethod();
            await mongoPaymentMethodRepository.insertOne(paymentMethod);

            const dbPaymentMethod = await mongoPaymentMethodRepository.fetchByEmployeeId(paymentMethod.employeeId);

            expect(dbPaymentMethod).to.deep.equal(paymentMethod);
        });
        it("should throw a not found error when the paymentMethod was not found", async () => {
            const paymentMethod = generateDirectPaymentMethod();
            await mongoPaymentMethodRepository.insertOne(paymentMethod);

            // noinspection ES6MissingAwait
            const promise = mongoPaymentMethodRepository.fetchByEmployeeId(paymentMethod.employeeId + 1);

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
    describe("insertOne", () => {
        it("insert the given paymentMethod", async () => {
            const paymentMethod = generateDirectPaymentMethod();

            await mongoPaymentMethodRepository.insertOne(paymentMethod);

            const dbPaymentMethod = await mongoPaymentMethodRepository.fetchByEmployeeId(paymentMethod.employeeId);
            expect(dbPaymentMethod).to.deep.equal(paymentMethod);
        });
        it("should not add the _id field to the entity", async () => {
            const paymentMethod = generateDirectPaymentMethod();

            await mongoPaymentMethodRepository.insertOne(paymentMethod);

            expect(paymentMethod).not.to.have.property("_id");
        });
    });
});
