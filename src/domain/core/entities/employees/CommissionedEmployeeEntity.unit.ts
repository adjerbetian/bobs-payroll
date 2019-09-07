import { expect, generateCommissionedEmployee, generateSalesReceipt } from "@test/unit";
import { CommissionedEmployee } from "./CommissionedEmployee";
import { buildCommissionedEmployeeEntity, CommissionedEmployeeEntity } from "./CommissionedEmployeeEntity";

describe("entity CommissionedEmployeeEntity", () => {
    let employee: CommissionedEmployee;
    let employeeEntity: CommissionedEmployeeEntity;

    describe("computePayAmount", () => {
        beforeEach(() => {
            employee = generateCommissionedEmployee();
            employeeEntity = buildCommissionedEmployeeEntity(employee);
        });

        it("should return the salary", async () => {
            const amount = await employeeEntity.computeCommissionedSalary([]);

            expect(amount).to.equal(employee.work.monthlySalary);
        });
        it("should take into account the sales receipts", async () => {
            const salesReceipts = [generateSalesReceipt(), generateSalesReceipt()];

            const amount = await employeeEntity.computeCommissionedSalary(salesReceipts);

            const commission = (salesReceipts[0].amount + salesReceipts[1].amount) * employee.work.commissionRate;
            expect(amount).to.equal(commission + employee.work.monthlySalary);
        });
    });
});
