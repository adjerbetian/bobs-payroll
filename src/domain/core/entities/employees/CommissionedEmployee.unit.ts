import { entityGenerators, expect } from "@test/unit";
import { CommissionedEmployee } from "../Employee";

describe("entity CommissionedEmployee", () => {
    let employee: CommissionedEmployee;

    describe("computePayAmount", () => {
        beforeEach(() => {
            employee = entityGenerators.generateCommissionedEmployee();
        });

        it("should return the salary when there is no salesReceipt", async () => {
            const amount = await employee.computeCommissionedSalary([]);

            expect(amount).to.equal(employee.getSalary());
        });
        it("should take into account the sales receipts", async () => {
            const salesReceipts = [entityGenerators.generateSalesReceipt(), entityGenerators.generateSalesReceipt()];

            const amount = await employee.computeCommissionedSalary(salesReceipts);

            const commission =
                (salesReceipts[0].getAmount() + salesReceipts[1].getAmount()) * employee.getCommissionRate();
            expect(amount).to.equal(commission + employee.getSalary());
        });
    });
});
