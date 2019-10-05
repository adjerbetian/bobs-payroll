import { expect, generators } from "../../../../../../test/unit";

describe("entity CommissionedEmployee", () => {
    describe("computePayAmount", () => {
        it("should return the salary when there is no salesReceipt", async () => {
            const employee = generators.generateCommissionedEmployee({ salary: 3000 });

            const amount = await employee.computeCommissionedSalary([]);

            expect(amount).to.equal(3000);
        });
        it("should take into account the sales receipts", async () => {
            const employee = generators.generateCommissionedEmployee({
                salary: 3000,
                commissionRate: 0.1
            });
            const salesReceipts = [
                generators.generateSalesReceipt({ amount: 2000 }),
                generators.generateSalesReceipt({ amount: 4000 })
            ];

            const amount = await employee.computeCommissionedSalary(salesReceipts);

            const commission = (2000 + 4000) * 0.1;
            expect(amount).to.equal(commission + 3000);
        });
    });
});
