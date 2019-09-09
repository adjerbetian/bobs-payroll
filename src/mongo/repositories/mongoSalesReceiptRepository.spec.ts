import {
    expect,
    generateIndex,
    monday,
    entitySeeders,
    never,
    tuesday,
    lastTuesday,
    entityGenerators
} from "@test/integration";
import { dbSalesReceipts } from "../databases";
import { makeMongoSalesReceiptRepository } from "./mongoSalesReceiptRepository";

describe("mongoSalesReceiptRepository", () => {
    let repository: ReturnType<typeof makeMongoSalesReceiptRepository>;
    let employeeId: number;

    beforeEach(() => {
        repository = makeMongoSalesReceiptRepository(dbSalesReceipts);
        employeeId = generateIndex();
    });

    describe("fetchAllOfEmployeeSince", () => {
        it("should return the employee's sales receipts", async () => {
            const salesReceipts = [
                await entitySeeders.seedSalesReceipt({ employeeId }),
                await entitySeeders.seedSalesReceipt({ employeeId })
            ];
            await entitySeeders.seedSalesReceipt();

            const result = await repository.fetchAllOfEmployeeSince(employeeId, never);

            expect(result).entities.to.deep.equal(salesReceipts);
        });
        it("should return the sales receipts which are after the given date", async () => {
            const salesReceipt = await entitySeeders.seedSalesReceipt({ employeeId, date: tuesday });
            await entitySeeders.seedSalesReceipt({ employeeId, date: lastTuesday });

            const result = await repository.fetchAllOfEmployeeSince(employeeId, monday);

            expect(result).entities.to.deep.equal([salesReceipt]);
        });
    });
    describe("insert", () => {
        it("insert the given sales receipt", async () => {
            const salesReceipt = entityGenerators.generateSalesReceipt({ employeeId });

            await repository.insert(salesReceipt);

            const dbSalesReceipt = await repository.fetchAllOfEmployeeSince(employeeId, never);
            expect(dbSalesReceipt).entities.to.equal([salesReceipt]);
        });
    });
});
