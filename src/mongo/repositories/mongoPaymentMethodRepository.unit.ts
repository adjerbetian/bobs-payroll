import { expect, generateDirectPaymentMethod, generateIndex, Stub } from "@test/unit";
import { PaymentMethod } from "../../domain";
import { MongoDbAdapter } from "../databases";
import { buildStubbedMongoDbAdapter } from "../test";
import { makeMongoPaymentMethodRepository } from "./mongoPaymentMethodRepository";

describe("mongoPaymentMethodRepository", () => {
    let stubbedDb: Stub<MongoDbAdapter<PaymentMethod>>;
    let repository: ReturnType<typeof makeMongoPaymentMethodRepository>;

    beforeEach(() => {
        stubbedDb = buildStubbedMongoDbAdapter();
        repository = makeMongoPaymentMethodRepository(stubbedDb);
    });

    describe("fetchByEmployeeId", () => {
        it("should return the paymentMethod matching the employee id", async () => {
            const employeeId = generateIndex();
            const paymentMethod = generateDirectPaymentMethod();
            stubbedDb.fetch.withArgs({ employeeId }).resolves(paymentMethod);

            const dbPaymentMethod = await repository.fetchByEmployeeId(employeeId);

            expect(dbPaymentMethod).to.deep.equal(paymentMethod);
        });
    });
    describe("deleteByEmployeeId", () => {
        it("delete the payment method of the employee", async () => {
            const employeeId = generateIndex();
            await stubbedDb.removeAll.resolves();

            await repository.deleteByEmployeeId(employeeId);

            await expect(stubbedDb.removeAll).to.have.been.calledOnceWith({ employeeId });
        });
    });
    describe("insert", () => {
        it("insert the given paymentMethod", async () => {
            const paymentMethod = generateDirectPaymentMethod();
            await stubbedDb.insert.resolves();

            await repository.insert(paymentMethod);

            expect(stubbedDb.insert).to.have.been.calledOnceWith(paymentMethod);
        });
    });
});
