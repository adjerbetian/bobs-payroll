import {
    expect,
    generateIndex,
    monday,
    seeders,
    never,
    tuesday,
    lastTuesday,
    generators
} from "../../../../../test/integration";
import { dbSalesReceipts } from "../collections";
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
                await seeders.seedSalesReceipt({ employeeId }),
                await seeders.seedSalesReceipt({ employeeId })
            ];
            await seeders.seedSalesReceipt();

            const result = await repository.fetchAllOfEmployeeSince(employeeId, never);

            expect(result).entities.to.deep.equal(salesReceipts);
        });
        it("should not return the other employees sales receipts", async () => {
            await seeders.seedSalesReceipt();

            const result = await repository.fetchAllOfEmployeeSince(employeeId, never);

            expect(result).to.be.empty;
        });
        it("should return the sales receipts which are after the given date", async () => {
            await seeders.seedSalesReceipt({ employeeId, date: tuesday });
            await seeders.seedSalesReceipt({ employeeId, date: lastTuesday });

            const result = await repository.fetchAllOfEmployeeSince(employeeId, monday);

            expect(result).to.have.lengthOf(1);
            expect(result[0].getDate()).to.equal(tuesday);
        });
    });
    describe("insert", () => {
        it("should insert the given sales receipt", async () => {
            const salesReceipt = generators.generateSalesReceipt({ employeeId });

            await repository.insert(salesReceipt);

            const employeeReceipts = await repository.fetchAllOfEmployeeSince(employeeId, never);
            expect(employeeReceipts).entities.to.equal([salesReceipt]);
        });
    });
});
