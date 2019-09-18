import { expect, generateIndex, generators, never, seeders } from "@test/integration";
import { NotFoundError, PaymentMethod } from "../../../core";
import { Payment } from "../../domain";
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
            await seeders.seedPayment({ employeeId });
            await seeders.seedPayment({ employeeId });
            const payment = await seeders.seedPayment({ employeeId });

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
            const payment = await seeders.seedPayment({ employeeId });

            const date = await repository.fetchEmployeeLastPaymentDate(employeeId);

            expect(date).to.equal(payment.getDate());
        });
        it("should return the 0 date when the employee was never paid", async () => {
            const date = await repository.fetchEmployeeLastPaymentDate(employeeId);

            expect(date).to.equal(never);
        });
    });
    describe("insert", () => {
        it("should insert the payment with a hold payment method", async () => {
            const payment = generatePaymentWithMethod(generators.generateHoldPaymentMethod({ employeeId }));

            await repository.insert(payment);

            await expectPaymentToExistInDB(payment);
        });
        it("should insert the payment with a direct payment method", async () => {
            const payment = generatePaymentWithMethod(generators.generateDirectPaymentMethod({ employeeId }));

            await repository.insert(payment);

            await expectPaymentToExistInDB(payment);
        });
        it("should insert the payment with a mail payment method", async () => {
            const payment = generatePaymentWithMethod(generators.generateMailPaymentMethod({ employeeId }));

            await repository.insert(payment);

            await expectPaymentToExistInDB(payment);
        });

        function generatePaymentWithMethod(method: PaymentMethod): Payment {
            return generators.generatePayment({
                employeeId: method.getEmployeeId(),
                method
            });
        }

        async function expectPaymentToExistInDB(payment: Payment): Promise<void> {
            const dbPayment = await repository.fetchLastOfEmployee(employeeId);
            expect(dbPayment).entity.to.equal(payment);
        }
    });
});
