import {
    buildStubbedCoreActions,
    buildStubFor,
    generators,
    expect,
    firstDayOfMonth,
    lastDayOfMonth,
    Stub
} from "@test/unit";
import { CoreActions } from "../../../../core";
import { CreatePaymentForEmployee } from "../../payment";
import { makeRunCommissionedPayroll } from "./runCommissionedPayroll";

describe("action runCommissionedPayroll", () => {
    let stubbedCoreActions: Stub<CoreActions>;
    let stubbedCreatePaymentForEmployee: Stub<CreatePaymentForEmployee>;

    let runCommissionedPayroll: ReturnType<typeof makeRunCommissionedPayroll>;

    beforeEach(() => {
        stubbedCoreActions = buildStubbedCoreActions();
        stubbedCreatePaymentForEmployee = buildStubFor("fetchEmployeePaymentMethod");

        runCommissionedPayroll = makeRunCommissionedPayroll({
            coreActions: stubbedCoreActions,
            createPaymentForEmployee: stubbedCreatePaymentForEmployee
        });

        stubbedCreatePaymentForEmployee.resolves();
        stubbedCoreActions.fetchAllEmployeeSalesReceiptsSince.resolves([]);
    });

    it("should insert the right payment the employee", async () => {
        const employee = generators.generateCommissionedEmployee();
        const salesReceipts = [generators.generateSalesReceipt(), generators.generateSalesReceipt()];
        stubbedCoreActions.fetchAllCommissionedEmployees.resolves([employee]);
        stubbedCoreActions.fetchAllEmployeeSalesReceiptsSince
            .withArgs(employee.getId(), firstDayOfMonth)
            .resolves(salesReceipts);

        await runCommissionedPayroll(lastDayOfMonth);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledOnceWith({
            employeeId: employee.getId(),
            date: lastDayOfMonth,
            amount: employee.computeCommissionedSalary(salesReceipts)
        });
    });

    it("should insert payments for each employee", async () => {
        const employees = [generators.generateCommissionedEmployee(), generators.generateCommissionedEmployee()];
        stubbedCoreActions.fetchAllCommissionedEmployees.resolves(employees);

        await runCommissionedPayroll(lastDayOfMonth);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledTwice;
    });
});
