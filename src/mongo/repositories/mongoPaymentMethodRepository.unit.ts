import { buildStubMongoDbAdapter, Stub } from "../../../test/stubBuilders";
import { generateDirectPaymentMethod, generateIndex } from "../../../test/generators";
import { expect } from "../../../test/unitTest";
import { PaymentMethod, PaymentMethodRepository } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";
import { buildMongoPaymentMethodRepository } from "./mongoPaymentMethodRepository";

describe("mongoPaymentMethodRepository", () => {
    let stubDb: Stub<MongoDbAdapter<PaymentMethod>>;
    let repository: PaymentMethodRepository;

    beforeEach(() => {
        stubDb = buildStubMongoDbAdapter();
        repository = buildMongoPaymentMethodRepository(stubDb);
    });

    describe("fetchByEmployeeId", () => {
        it("should return the paymentMethod matching the employee id", async () => {
            const employeeId = generateIndex();
            const paymentMethod = generateDirectPaymentMethod();
            stubDb.fetch.withArgs({ employeeId }).resolves(paymentMethod);

            const dbPaymentMethod = await repository.fetchByEmployeeId(employeeId);

            expect(dbPaymentMethod).to.deep.equal(paymentMethod);
        });
    });
    describe("deleteByEmployeeId", () => {
        it("delete the payment method of the employee", async () => {
            const employeeId = generateIndex();
            await stubDb.removeAll.resolves();

            await repository.deleteByEmployeeId(employeeId);

            await expect(stubDb.removeAll).to.have.been.calledOnceWith({ employeeId });
        });
    });
    describe("insert", () => {
        it("insert the given paymentMethod", async () => {
            const paymentMethod = generateDirectPaymentMethod();
            await stubDb.insert.resolves();

            await repository.insert(paymentMethod);

            expect(stubDb.insert).to.have.been.calledOnceWith(paymentMethod);
        });
    });
});
