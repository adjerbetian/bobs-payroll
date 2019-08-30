import { never } from "../../../test/dates";
import { buildFakeMongoDbAdapter, Fake } from "../../../test/fakeBuilders";
import { generateIndex, generatePayment } from "../../../test/generators";
import { expect } from "../../../test/unitTest";
import { Payment, PaymentRepository } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";
import { buildMongoPaymentRepository } from "./mongoPaymentRepository";

describe("mongoPaymentRepository", () => {
    let fakeDb: Fake<MongoDbAdapter<Payment>>;
    let repository: PaymentRepository;

    beforeEach(() => {
        fakeDb = buildFakeMongoDbAdapter();
        repository = buildMongoPaymentRepository(fakeDb);
    });

    describe("fetchLastOfEmployee", () => {
        it("should return last the payment to the employee", async () => {
            const employeeId = generateIndex();
            const payment = generatePayment();
            fakeDb.fetchLast.withArgs({ employeeId }).resolves(payment);

            const dbPayment = await repository.fetchLastOfEmployee(employeeId);

            expect(dbPayment).to.deep.equal(payment);
        });
    });
    describe("fetchEmployeeLastPaymentDate", () => {
        it("should return the date of the employee's last payment", async () => {
            const employeeId = generateIndex();
            const payment = generatePayment();
            fakeDb.exists.withArgs({ employeeId }).resolves(true);
            fakeDb.fetchLast.withArgs({ employeeId }).resolves(payment);

            const date = await repository.fetchEmployeeLastPaymentDate(employeeId);

            expect(date).to.equal(payment.date);
        });
        it("should return the 0 date when the employee was never paid", async () => {
            const employeeId = generateIndex();
            fakeDb.exists.withArgs({ employeeId }).resolves(false);

            const date = await repository.fetchEmployeeLastPaymentDate(employeeId);

            expect(date).to.equal(never);
        });
    });
    describe("insert", () => {
        it("should insert the payment", async () => {
            const payment = generatePayment();
            fakeDb.insert.resolves();

            await repository.insert(payment);

            expect(fakeDb.insert).to.have.been.calledWith(payment);
        });
    });
});
