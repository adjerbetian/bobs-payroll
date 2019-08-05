import "../../test/integrationTest";
import { expect } from "../../test/unitTest";
import { generateSalesReceipt } from "../../test/generators";
import { salesReceiptRepository } from "./salesReceiptRepository";
import { dbSalesReceipt } from "./db";
import { SalesReceipt } from "../entities";
import { cloneDeep } from "lodash";

describe("salesReceiptRepository", () => {
    describe("fetchAllOfEmployee", () => {
        it("should return all the employee's sales receipt", async () => {
            const salesReceipt = await dbGenerateSalesReceipt();

            const salesReceipts = await salesReceiptRepository.fetchAllOfEmployee(
                salesReceipt.employeeId
            );

            expect(salesReceipts).to.deep.equal([salesReceipt]);
        });
        it("should not return other employees' sales receipt", async () => {
            const salesReceipt = await dbGenerateSalesReceipt();

            const salesReceipts = await salesReceiptRepository.fetchAllOfEmployee(
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

            await salesReceiptRepository.insertOne(salesReceipt);

            const salesReceipts = await salesReceiptRepository.fetchAllOfEmployee(
                salesReceipt.employeeId
            );
            expect(salesReceipts).to.deep.equal([salesReceipt]);
        });
        it("should not add the _id field to the entity", async () => {
            const salesReceipt = generateSalesReceipt();

            await salesReceiptRepository.insertOne(salesReceipt);

            expect(salesReceipt).not.to.have.property("_id");
        });
    });
});
