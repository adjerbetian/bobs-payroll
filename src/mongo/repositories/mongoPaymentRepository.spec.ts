import { entityGenerators, entitySeeders, expect, generateIndex, never } from "@test/integration";
import { NotFoundError } from "../../domain";
import { dbPayments } from "../databases";
import { makeMongoPaymentRepository } from "./mongoPaymentRepository";

describe("mongoPaymentRepository", () => {
    let repository: ReturnType<typeof makeMongoPaymentRepository>;
    let employeeId: number;

    beforeEach(() => {
        repository = makeMongoPaymentRepository(dbPayments);
        employeeId = generateIndex();
    });

    describe("fetchLastOfEmployee", () => {
        it("should return last the payment of the employee", async () => {
            await entitySeeders.seedPayment({ employeeId });
            await entitySeeders.seedPayment({ employeeId });
            const payment = await entitySeeders.seedPayment({ employeeId });

            const dbPayment = await repository.fetchLastOfEmployee(employeeId);

            expect(dbPayment).entity.to.equal(payment);
        });
        it("should throw a not found error when the employee has none", async () => {
            const promise = repository.fetchLastOfEmployee(employeeId);

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
    describe("fetchEmployeeLastPaymentDate", () => {
        it("should return the date of the employee's last payment", async () => {
            const payment = await entitySeeders.seedPayment({ employeeId });

            const date = await repository.fetchEmployeeLastPaymentDate(employeeId);

            expect(date).to.equal(payment.getDate());
        });
        it("should return the 0 date when the employee was never paid", async () => {
            const date = await repository.fetchEmployeeLastPaymentDate(employeeId);

            expect(date).to.equal(never);
        });
    });
    describe("insert", () => {
        it("should insert the payment", async () => {
            const payment = entityGenerators.generatePayment({ employeeId });

            await repository.insert(payment);

            const dbSalesReceipt = await repository.fetchLastOfEmployee(employeeId);
            expect(dbSalesReceipt).entity.to.equal(payment);
        });
    });
});
