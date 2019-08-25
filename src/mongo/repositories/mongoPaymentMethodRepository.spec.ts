import { generateDirectPaymentMethod } from "../../../test/generators";
import "../../../test/integrationTest";
import { expect } from "../../../test/unitTest";
import { NotFoundError } from "../../domain";
import { dbPaymentMethods as db } from "../db";
import { mongoPaymentMethodRepository as repository } from "./mongoPaymentMethodRepository";

describe("mongoPaymentMethodRepository", () => {
    describe("fetchByEmployeeId", () => {
        it("should return the paymentMethod matching the employee id", async () => {
            const paymentMethod = generateDirectPaymentMethod();
            await db.insert(paymentMethod);

            const dbPaymentMethod = await repository.fetchByEmployeeId(paymentMethod.employeeId);

            expect(dbPaymentMethod).to.deep.equal(paymentMethod);
        });
        it("should throw a not found error when the paymentMethod was not found", async () => {
            const paymentMethod = generateDirectPaymentMethod();
            await db.insert(paymentMethod);

            const promise = repository.fetchByEmployeeId(paymentMethod.employeeId + 1);

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
    describe("insert", () => {
        it("insert the given paymentMethod", async () => {
            const paymentMethod = generateDirectPaymentMethod();

            await repository.insert(paymentMethod);

            const dbPaymentMethod = await repository.fetchByEmployeeId(paymentMethod.employeeId);
            expect(dbPaymentMethod).to.deep.equal(paymentMethod);
        });
        it("should not add the _id field to the entity", async () => {
            const paymentMethod = generateDirectPaymentMethod();

            await repository.insert(paymentMethod);

            expect(paymentMethod).not.to.have.property("_id");
        });
    });
    describe("deleteByEmployeeId", () => {
        it("delete the payment method of the employee", async () => {
            const paymentMethod = generateDirectPaymentMethod();
            await db.insert(paymentMethod);

            await repository.deleteByEmployeeId(paymentMethod.employeeId);

            const promise = repository.fetchByEmployeeId(paymentMethod.employeeId);
            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
});
