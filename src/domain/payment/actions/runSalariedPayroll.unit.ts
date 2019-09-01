import {
    buildStubbedCoreActions,
    buildStubFor,
    expect,
    generateSalariedEmployee,
    lastDayOfMonth,
    Stub
} from "@test/unit";
import { CoreActions } from "../../core";
import { CreatePaymentForEmployee } from "./CreatePaymentForEmployee";
import { RunPayroll } from "./RunPayroll";
import { buildRunSalariedPayroll } from "./runSalariedPayroll";

describe("action runSalariedPayroll", () => {
    let stubbedCoreActions: Stub<CoreActions>;
    let stubbedCreatePaymentForEmployee: Stub<CreatePaymentForEmployee>;

    let runSalariedPayroll: RunPayroll;

    beforeEach(() => {
        stubbedCoreActions = buildStubbedCoreActions();
        stubbedCreatePaymentForEmployee = buildStubFor("createPaymentForEmployee");

        runSalariedPayroll = buildRunSalariedPayroll({
            coreActions: stubbedCoreActions,
            createPaymentForEmployee: stubbedCreatePaymentForEmployee
        });

        stubbedCreatePaymentForEmployee.resolves();
    });

    it("should insert the right payment the employee", async () => {
        const employee = generateSalariedEmployee();
        stubbedCoreActions.fetchAllSalariedEmployees.resolves([employee]);

        await runSalariedPayroll(lastDayOfMonth);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledOnceWith({
            employeeId: employee.id,
            date: lastDayOfMonth,
            amount: employee.work.monthlySalary
        });
    });

    it("should insert payments for each employee", async () => {
        const employees = [generateSalariedEmployee(), generateSalariedEmployee()];
        stubbedCoreActions.fetchAllSalariedEmployees.resolves(employees);

        await runSalariedPayroll(lastDayOfMonth);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledTwice;
    });
});
