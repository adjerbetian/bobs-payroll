import { buildStubMongoDbAdapter, expect, generateIndex, generateSalesReceipt, Stub } from "@test/unit";
import { SalesReceipt, SalesReceiptRepository } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";
import { buildMongoSalesReceiptRepository } from "./mongoSalesReceiptRepository";

describe("mongoSalesReceiptRepository", () => {
    let stubDb: Stub<MongoDbAdapter<SalesReceipt>>;
    let repository: SalesReceiptRepository;

    beforeEach(() => {
        stubDb = buildStubMongoDbAdapter();
        repository = buildMongoSalesReceiptRepository(stubDb);
    });

    describe("fetchAllOfEmployee", () => {
        it("should return all the employee's sales receipt", async () => {
            const employeeId = generateIndex();
            const salesReceipts = [generateSalesReceipt()];
            stubDb.fetchAll.withArgs({ employeeId }).resolves(salesReceipts);

            const result = await repository.fetchAllOfEmployee(employeeId);

            expect(result).to.deep.equal(salesReceipts);
        });
    });
    describe("insert", () => {
        it("insert the given sales receipt", async () => {
            const salesReceipt = generateSalesReceipt();
            stubDb.insert.resolves();

            await repository.insert(salesReceipt);

            expect(stubDb.insert).to.have.calledOnceWith(salesReceipt);
        });
    });
});
