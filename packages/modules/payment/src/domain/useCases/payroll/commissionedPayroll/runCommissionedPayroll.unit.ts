import { firstDayOfMonth, lastDayOfMonth } from "@payroll/common";
import { CoreUseCases } from "@modules/core";
import { buildStubFor, expect, Stub } from "@infra/test";
import { buildStubbedCoreUseCases, generators } from "../../../../test";
import { CreatePaymentForEmployee } from "../../payment";
import { makeRunCommissionedPayroll } from "./runCommissionedPayroll";

describe("use case - runCommissionedPayroll", () => {
    let stubbedCoreUseCases: Stub<CoreUseCases>;
    let stubbedCreatePaymentForEmployee: Stub<CreatePaymentForEmployee>;

    let runCommissionedPayroll: ReturnType<typeof makeRunCommissionedPayroll>;

    beforeEach(() => {
        stubbedCoreUseCases = buildStubbedCoreUseCases();
        stubbedCreatePaymentForEmployee = buildStubFor("fetchEmployeePaymentMethod");

        runCommissionedPayroll = makeRunCommissionedPayroll({
            coreUseCases: stubbedCoreUseCases,
            createPaymentForEmployee: stubbedCreatePaymentForEmployee
        });

        stubbedCreatePaymentForEmployee.resolves();
        stubbedCoreUseCases.fetchAllEmployeeSalesReceiptsSince.resolves([]);
    });

    it("should insert the right payment the employee", async () => {
        const employee = generators.generateCommissionedEmployee();
        const salesReceipts = [generators.generateSalesReceipt(), generators.generateSalesReceipt()];
        stubbedCoreUseCases.fetchAllCommissionedEmployees.resolves([employee]);
        stubbedCoreUseCases.fetchAllEmployeeSalesReceiptsSince
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
        stubbedCoreUseCases.fetchAllCommissionedEmployees.resolves(employees);

        await runCommissionedPayroll(lastDayOfMonth);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledTwice;
    });
});
