import {
    buildStubSalesReceiptRepository,
    expect,
    generateCommissionedEmployee,
    generateSalesReceipt,
    Stub
} from "@test/unit";
import { CommissionedEmployee } from "../../../entities";
import { SalesReceiptRepository } from "../../../repositories";
import { buildComputeEmployeeCommission } from "./computeEmployeeCommission";

describe("action computeEmployeeCommission", () => {
    let stubSalesReceiptRepository: Stub<SalesReceiptRepository>;
    let computeEmployeeCommission: ReturnType<typeof buildComputeEmployeeCommission>;

    beforeEach(() => {
        stubSalesReceiptRepository = buildStubSalesReceiptRepository();

        computeEmployeeCommission = buildComputeEmployeeCommission({
            salesReceiptRepository: stubSalesReceiptRepository
        });
    });

    let employee: CommissionedEmployee;

    beforeEach(() => {
        employee = generateCommissionedEmployee();
    });

    it("should take into account the regular hours made on the employee's time cards", async () => {
        const salesReceipts = [generateSalesReceipt(), generateSalesReceipt()];
        stubSalesReceiptRepository.fetchAllOfEmployee.withArgs(employee.id).resolves(salesReceipts);

        const amount = await computeEmployeeCommission(employee);

        const expectedCommission = (salesReceipts[0].amount + salesReceipts[1].amount) * employee.work.commissionRate;
        expect(amount).to.equal(expectedCommission);
    });
});
