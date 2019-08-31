import { expect, generateIndex, generateSalesReceipt, Stub } from "@test/unit";
import { SalesReceipt } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";
import { buildStubbedMongoDbAdapter } from "../test";
import { buildMongoSalesReceiptRepository } from "./mongoSalesReceiptRepository";

describe("mongoSalesReceiptRepository", () => {
    let stubbedDb: Stub<MongoDbAdapter<SalesReceipt>>;
    let repository: ReturnType<typeof buildMongoSalesReceiptRepository>;

    beforeEach(() => {
        stubbedDb = buildStubbedMongoDbAdapter();
        repository = buildMongoSalesReceiptRepository(stubbedDb);
    });

    describe("fetchAllOfEmployee", () => {
        it("should return all the employee's sales receipt", async () => {
            const employeeId = generateIndex();
            const salesReceipts = [generateSalesReceipt()];
            stubbedDb.fetchAll.withArgs({ employeeId }).resolves(salesReceipts);

            const result = await repository.fetchAllOfEmployee(employeeId);

            expect(result).to.deep.equal(salesReceipts);
        });
    });
    describe("insert", () => {
        it("insert the given sales receipt", async () => {
            const salesReceipt = generateSalesReceipt();
            stubbedDb.insert.resolves();

            await repository.insert(salesReceipt);

            expect(stubbedDb.insert).to.have.calledOnceWith(salesReceipt);
        });
    });
});
