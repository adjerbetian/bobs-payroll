import { generateSalesReceipt } from "../../../test/generators";
import "../../../test/integrationTest";
import { expect } from "../../../test/unitTest";
import { dbSalesReceipts as db } from "../db";
import { mongoSalesReceiptRepository as repository } from "./mongoSalesReceiptRepository";

describe("mongoSalesReceiptRepository", () => {
    describe("fetchAllOfEmployee", () => {
        it("should return all the employee's sales receipt", async () => {
            const salesReceipt = generateSalesReceipt();
            await db.insert(salesReceipt);

            const salesReceipts = await repository.fetchAllOfEmployee(salesReceipt.employeeId);

            expect(salesReceipts).to.deep.equal([salesReceipt]);
        });
        it("should not return other employees' sales receipt", async () => {
            const salesReceipt = generateSalesReceipt();
            await db.insert(salesReceipt);

            const salesReceipts = await repository.fetchAllOfEmployee(salesReceipt.employeeId + 1);

            expect(salesReceipts).to.be.empty;
        });
    });
    describe("insert", () => {
        it("insert the given sales receipt", async () => {
            const salesReceipt = generateSalesReceipt();

            await repository.insert(salesReceipt);

            const salesReceipts = await db.fetchAll({ employeeId: salesReceipt.employeeId });
            expect(salesReceipts).to.deep.equal([salesReceipt]);
        });
        it("should not add the _id field to the entity", async () => {
            const salesReceipt = generateSalesReceipt();

            await repository.insert(salesReceipt);

            expect(salesReceipt).not.to.have.property("_id");
        });
    });
});
