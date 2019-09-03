import {
    buildStubbedCoreActions,
    expect,
    firstDayOfMonth,
    generateCommissionedEmployee,
    generateSalesReceipt,
    lastDayOfMonth,
    Stub
} from "@test/unit";
import { CommissionedEmployee, CoreActions } from "../../../../core";
import { buildComputeEmployeeCommission } from "./computeEmployeeCommission";

describe("action computeEmployeeCommission", () => {
    let stubbedCoreActions: Stub<CoreActions>;
    let computeEmployeeCommission: ReturnType<typeof buildComputeEmployeeCommission>;

    beforeEach(() => {
        stubbedCoreActions = buildStubbedCoreActions();

        computeEmployeeCommission = buildComputeEmployeeCommission({
            coreActions: stubbedCoreActions
        });
    });

    let employee: CommissionedEmployee;

    beforeEach(() => {
        employee = generateCommissionedEmployee();
    });

    it("should take into account the sales receipts", async () => {
        const salesReceipts = [generateSalesReceipt(), generateSalesReceipt()];
        stubbedCoreActions.fetchAllEmployeeSalesReceiptsSince
            .withArgs(employee.id, firstDayOfMonth)
            .resolves(salesReceipts);

        const amount = await computeEmployeeCommission(lastDayOfMonth, employee);

        const expectedCommission = (salesReceipts[0].amount + salesReceipts[1].amount) * employee.work.commissionRate;
        expect(amount).to.equal(expectedCommission);
    });
});
