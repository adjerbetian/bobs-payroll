import { expect, generateIndex, generateSalesReceipt, Stub } from "@test/unit";
import { SalesReceiptRepository } from "../../repositories";
import { buildStubbedSalesReceiptRepository } from "../../test";
import { buildFetchAllEmployeeSalesReceipts } from "./fetchAllEmployeeSalesReceipts";

describe("action fetchAllEmployeeSalesReceipts", () => {
    let stubbedSalesReceiptRepository: Stub<SalesReceiptRepository>;
    let fetchAllEmployeeSalesReceipts: ReturnType<typeof buildFetchAllEmployeeSalesReceipts>;

    beforeEach(() => {
        stubbedSalesReceiptRepository = buildStubbedSalesReceiptRepository();
        fetchAllEmployeeSalesReceipts = buildFetchAllEmployeeSalesReceipts({
            salesReceiptRepository: stubbedSalesReceiptRepository
        });
    });

    it("should return all employee's sales receipts", async () => {
        const employeeId = generateIndex();
        const salesReceipts = [generateSalesReceipt(), generateSalesReceipt()];
        stubbedSalesReceiptRepository.fetchAllOfEmployee.withArgs(employeeId).resolves(salesReceipts);

        const result = await fetchAllEmployeeSalesReceipts(employeeId);

        expect(result).to.deep.equal(salesReceipts);
    });
});
