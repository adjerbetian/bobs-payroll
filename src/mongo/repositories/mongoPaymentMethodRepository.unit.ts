import { buildFakeMongoDbAdapter, Fake } from "../../../test/fakeBuilders";
import { generateDirectPaymentMethod, generateIndex } from "../../../test/generators";
import { expect } from "../../../test/unitTest";
import { PaymentMethod, PaymentMethodRepository } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";
import { buildMongoPaymentMethodRepository } from "./mongoPaymentMethodRepository";

describe("mongoPaymentMethodRepository", () => {
    let fakeDb: Fake<MongoDbAdapter<PaymentMethod>>;
    let repository: PaymentMethodRepository;

    beforeEach(() => {
        fakeDb = buildFakeMongoDbAdapter();
        repository = buildMongoPaymentMethodRepository(fakeDb);
    });

    describe("fetchByEmployeeId", () => {
        it("should return the paymentMethod matching the employee id", async () => {
            const employeeId = generateIndex();
            const paymentMethod = generateDirectPaymentMethod();
            fakeDb.fetch.withArgs({ employeeId }).resolves(paymentMethod);

            const dbPaymentMethod = await repository.fetchByEmployeeId(employeeId);

            expect(dbPaymentMethod).to.deep.equal(paymentMethod);
        });
    });
    describe("deleteByEmployeeId", () => {
        it("delete the payment method of the employee", async () => {
            const employeeId = generateIndex();
            await fakeDb.removeAll.resolves();

            await repository.deleteByEmployeeId(employeeId);

            await expect(fakeDb.removeAll).to.have.been.calledOnceWith({ employeeId });
        });
    });
    describe("insert", () => {
        it("insert the given paymentMethod", async () => {
            const paymentMethod = generateDirectPaymentMethod();
            await fakeDb.insert.resolves();

            await repository.insert(paymentMethod);

            expect(fakeDb.insert).to.have.been.calledOnceWith(paymentMethod);
        });
    });
});
