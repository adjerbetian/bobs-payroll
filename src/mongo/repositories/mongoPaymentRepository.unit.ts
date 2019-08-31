import { buildStubbedMongoDbAdapter, expect, generateIndex, generatePayment, never, Stub } from "@test/unit";
import { Payment, PaymentRepository } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";
import { buildMongoPaymentRepository } from "./mongoPaymentRepository";

describe("mongoPaymentRepository", () => {
    let stubbedDb: Stub<MongoDbAdapter<Payment>>;
    let repository: PaymentRepository;

    beforeEach(() => {
        stubbedDb = buildStubbedMongoDbAdapter();
        repository = buildMongoPaymentRepository(stubbedDb);
    });

    describe("fetchLastOfEmployee", () => {
        it("should return last the payment to the employee", async () => {
            const employeeId = generateIndex();
            const payment = generatePayment();
            stubbedDb.fetchLast.withArgs({ employeeId }).resolves(payment);

            const dbPayment = await repository.fetchLastOfEmployee(employeeId);

            expect(dbPayment).to.deep.equal(payment);
        });
    });
    describe("fetchEmployeeLastPaymentDate", () => {
        it("should return the date of the employee's last payment", async () => {
            const employeeId = generateIndex();
            const payment = generatePayment();
            stubbedDb.exists.withArgs({ employeeId }).resolves(true);
            stubbedDb.fetchLast.withArgs({ employeeId }).resolves(payment);

            const date = await repository.fetchEmployeeLastPaymentDate(employeeId);

            expect(date).to.equal(payment.date);
        });
        it("should return the 0 date when the employee was never paid", async () => {
            const employeeId = generateIndex();
            stubbedDb.exists.withArgs({ employeeId }).resolves(false);

            const date = await repository.fetchEmployeeLastPaymentDate(employeeId);

            expect(date).to.equal(never);
        });
    });
    describe("insert", () => {
        it("should insert the payment", async () => {
            const payment = generatePayment();
            stubbedDb.insert.resolves();

            await repository.insert(payment);

            expect(stubbedDb.insert).to.have.been.calledWith(payment);
        });
    });
});
