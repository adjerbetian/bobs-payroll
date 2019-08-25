import { buildFakeMongoDbAdapter, Fake } from "../../../test/fakeBuilders";
import { generateSalesReceipt } from "../../../test/generators";
import { expect } from "../../../test/unitTest";
import { generateIndex } from "../../../test/utils";
import { SalesReceipt, SalesReceiptRepository } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";
import { buildMongoSalesReceiptRepository } from "./mongoSalesReceiptRepository";

describe("mongoSalesReceiptRepository", () => {
    let fakeDb: Fake<MongoDbAdapter<SalesReceipt>>;
    let repository: SalesReceiptRepository;

    beforeEach(() => {
        fakeDb = buildFakeMongoDbAdapter();
        repository = buildMongoSalesReceiptRepository(fakeDb);
    });

    describe("fetchAllOfEmployee", () => {
        it("should return all the employee's sales receipt", async () => {
            const employeeId = generateIndex();
            const salesReceipts = [generateSalesReceipt()];
            fakeDb.fetchAll.withArgs({ employeeId }).resolves(salesReceipts);

            const result = await repository.fetchAllOfEmployee(employeeId);

            expect(result).to.deep.equal(salesReceipts);
        });
    });
    describe("insert", () => {
        it("insert the given sales receipt", async () => {
            const salesReceipt = generateSalesReceipt();
            fakeDb.insert.resolves();

            await repository.insert(salesReceipt);

            expect(fakeDb.insert).to.have.calledOnceWith(salesReceipt);
        });
    });
});
