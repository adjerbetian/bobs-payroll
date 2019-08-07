import { cloneDeep } from "lodash";
import { generateSalesReceipt } from "../../test/generators";
import "../../test/integrationTest";
import { expect } from "../../test/unitTest";
import { SalesReceipt } from "../core";
import { dbSalesReceipt } from "./db";
import { mongoSalesReceiptRepository } from "./mongoSalesReceiptRepository";

describe("mongoSalesReceiptRepository", () => {
    describe("fetchAllOfEmployee", () => {
        it("should return all the employee's sales receipt", async () => {
            const salesReceipt = await dbGenerateSalesReceipt();

            const salesReceipts = await mongoSalesReceiptRepository.fetchAllOfEmployee(
                salesReceipt.employeeId
            );

            expect(salesReceipts).to.deep.equal([salesReceipt]);
        });
        it("should not return other employees' sales receipt", async () => {
            const salesReceipt = await dbGenerateSalesReceipt();

            const salesReceipts = await mongoSalesReceiptRepository.fetchAllOfEmployee(
                salesReceipt.employeeId + 1
            );

            expect(salesReceipts).to.be.empty;
        });

        async function dbGenerateSalesReceipt(): Promise<SalesReceipt> {
            const salesReceipt = generateSalesReceipt();
            await dbSalesReceipt.insertOne(cloneDeep(salesReceipt));
            return salesReceipt;
        }
    });
    describe("insertOne", () => {
        it("insert the given sales receipt", async () => {
            const salesReceipt = generateSalesReceipt();

            await mongoSalesReceiptRepository.insertOne(salesReceipt);

            const salesReceipts = await mongoSalesReceiptRepository.fetchAllOfEmployee(
                salesReceipt.employeeId
            );
            expect(salesReceipts).to.deep.equal([salesReceipt]);
        });
        it("should not add the _id field to the entity", async () => {
            const salesReceipt = generateSalesReceipt();

            await mongoSalesReceiptRepository.insertOne(salesReceipt);

            expect(salesReceipt).not.to.have.property("_id");
        });
    });
});
