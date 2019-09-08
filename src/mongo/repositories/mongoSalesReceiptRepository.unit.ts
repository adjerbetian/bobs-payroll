import { expect, generateIndex, generateSalesReceipt, monday, Stub } from "@test/unit";
import { SalesReceipt } from "../../domain";
import { MongoDbAdapter } from "../databases";
import { buildStubbedMongoDbAdapter } from "../test";
import { makeMongoSalesReceiptRepository } from "./mongoSalesReceiptRepository";

describe("mongoSalesReceiptRepository", () => {
    let stubbedDb: Stub<MongoDbAdapter<SalesReceipt>>;
    let repository: ReturnType<typeof makeMongoSalesReceiptRepository>;

    beforeEach(() => {
        stubbedDb = buildStubbedMongoDbAdapter();
        repository = makeMongoSalesReceiptRepository(stubbedDb);
    });

    describe("fetchAllOfEmployeeSince", () => {
        it("should return all the employee's sales receipt", async () => {
            const employeeId = generateIndex();
            const salesReceipts = [generateSalesReceipt()];
            stubbedDb.fetchAll.withArgs({ employeeId, date: { $gte: monday } }).resolves(salesReceipts);

            const result = await repository.fetchAllOfEmployeeSince(employeeId, monday);

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
