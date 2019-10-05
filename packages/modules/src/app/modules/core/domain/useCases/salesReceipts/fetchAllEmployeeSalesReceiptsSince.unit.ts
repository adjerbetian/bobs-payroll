import { monday } from "@bobs-payroll/common";
import { generators, expect, generateIndex, Stub } from "../../../../../../test/unit";
import { SalesReceiptRepository } from "../../repositories";
import { buildStubbedSalesReceiptRepository } from "../../test";
import { makeFetchAllEmployeeSalesReceipts } from "./fetchAllEmployeeSalesReceiptsSince";

describe("use case - fetchAllEmployeeSalesReceipts", () => {
    let stubbedSalesReceiptRepository: Stub<SalesReceiptRepository>;
    let fetchAllEmployeeSalesReceipts: ReturnType<typeof makeFetchAllEmployeeSalesReceipts>;

    beforeEach(() => {
        stubbedSalesReceiptRepository = buildStubbedSalesReceiptRepository();
        fetchAllEmployeeSalesReceipts = makeFetchAllEmployeeSalesReceipts({
            salesReceiptRepository: stubbedSalesReceiptRepository
        });
    });

    it("should return all employee's sales receipts", async () => {
        const employeeId = generateIndex();
        const salesReceipts = [generators.generateSalesReceipt(), generators.generateSalesReceipt()];
        stubbedSalesReceiptRepository.fetchAllOfEmployeeSince.withArgs(employeeId, monday).resolves(salesReceipts);

        const result = await fetchAllEmployeeSalesReceipts(employeeId, monday);

        expect(result).to.deep.equal(salesReceipts);
    });
});
