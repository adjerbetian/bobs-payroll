import { never } from "../../../test/dates";
import { buildStubMongoDbAdapter, Stub } from "../../../test/stubBuilders";
import { generateIndex, generatePayment } from "../../../test/generators";
import { expect } from "../../../test/unitTest";
import { Payment, PaymentRepository } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";
import { buildMongoPaymentRepository } from "./mongoPaymentRepository";

describe("mongoPaymentRepository", () => {
    let stubDb: Stub<MongoDbAdapter<Payment>>;
    let repository: PaymentRepository;

    beforeEach(() => {
        stubDb = buildStubMongoDbAdapter();
        repository = buildMongoPaymentRepository(stubDb);
    });

    describe("fetchLastOfEmployee", () => {
        it("should return last the payment to the employee", async () => {
            const employeeId = generateIndex();
            const payment = generatePayment();
            stubDb.fetchLast.withArgs({ employeeId }).resolves(payment);

            const dbPayment = await repository.fetchLastOfEmployee(employeeId);

            expect(dbPayment).to.deep.equal(payment);
        });
    });
    describe("fetchEmployeeLastPaymentDate", () => {
        it("should return the date of the employee's last payment", async () => {
            const employeeId = generateIndex();
            const payment = generatePayment();
            stubDb.exists.withArgs({ employeeId }).resolves(true);
            stubDb.fetchLast.withArgs({ employeeId }).resolves(payment);

            const date = await repository.fetchEmployeeLastPaymentDate(employeeId);

            expect(date).to.equal(payment.date);
        });
        it("should return the 0 date when the employee was never paid", async () => {
            const employeeId = generateIndex();
            stubDb.exists.withArgs({ employeeId }).resolves(false);

            const date = await repository.fetchEmployeeLastPaymentDate(employeeId);

            expect(date).to.equal(never);
        });
    });
    describe("insert", () => {
        it("should insert the payment", async () => {
            const payment = generatePayment();
            stubDb.insert.resolves();

            await repository.insert(payment);

            expect(stubDb.insert).to.have.been.calledWith(payment);
        });
    });
});
