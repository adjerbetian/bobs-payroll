import { expect, generateCommissionedEmployee, generateSalesReceipt, Stub } from "@test/unit";
import { CommissionedEmployee, SalesReceiptRepository } from "../../../core";
import { buildStubbedSalesReceiptRepository } from "../../../core/test";
import { buildComputeEmployeeCommission } from "./computeEmployeeCommission";

describe("action computeEmployeeCommission", () => {
    let stubbedSalesReceiptRepository: Stub<SalesReceiptRepository>;
    let computeEmployeeCommission: ReturnType<typeof buildComputeEmployeeCommission>;

    beforeEach(() => {
        stubbedSalesReceiptRepository = buildStubbedSalesReceiptRepository();

        computeEmployeeCommission = buildComputeEmployeeCommission({
            salesReceiptRepository: stubbedSalesReceiptRepository
        });
    });

    let employee: CommissionedEmployee;

    beforeEach(() => {
        employee = generateCommissionedEmployee();
    });

    it("should take into account the regular hours made on the employee's time cards", async () => {
        const salesReceipts = [generateSalesReceipt(), generateSalesReceipt()];
        stubbedSalesReceiptRepository.fetchAllOfEmployee.withArgs(employee.id).resolves(salesReceipts);

        const amount = await computeEmployeeCommission(employee);

        const expectedCommission = (salesReceipts[0].amount + salesReceipts[1].amount) * employee.work.commissionRate;
        expect(amount).to.equal(expectedCommission);
    });
});
