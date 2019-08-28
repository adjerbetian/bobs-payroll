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
});
