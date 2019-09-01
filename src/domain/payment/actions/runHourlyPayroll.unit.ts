import {
    buildStubbedCoreActions,
    buildStubFor,
    expect,
    friday,
    generateFloatBetween,
    generateHourlyEmployee,
    Stub
} from "@test/unit";
import { CoreActions, HourlyEmployee } from "../../core";
import { CreatePaymentForEmployee } from "./CreatePaymentForEmployee";
import { buildRunHourlyPayroll, ComputeHourlyEmployeePaymentDueAmount } from "./runHourlyPayroll";
import { RunPayroll } from "./RunPayroll";

describe("action runHourlyPayroll", () => {
    let stubbedCoreActions: Stub<CoreActions>;
    let stubbedComputeHourlyEmployeePaymentDueAmount: Stub<ComputeHourlyEmployeePaymentDueAmount>;
    let stubbedCreatePaymentForEmployee: Stub<CreatePaymentForEmployee>;

    let runHourlyPayroll: RunPayroll;

    beforeEach(() => {
        stubbedCoreActions = buildStubbedCoreActions();
        stubbedComputeHourlyEmployeePaymentDueAmount = buildStubFor("computeHourlyEmployeePaymentDueAmount");
        stubbedCreatePaymentForEmployee = buildStubFor("createPaymentForEmployee");

        runHourlyPayroll = buildRunHourlyPayroll({
            coreActions: stubbedCoreActions,
            computeHourlyEmployeePaymentDueAmount: stubbedComputeHourlyEmployeePaymentDueAmount,
            createPaymentForEmployee: stubbedCreatePaymentForEmployee
        });

        stubbedCreatePaymentForEmployee.resolves();
    });

    it("should insert the right payment the employee", async () => {
        const employee = generateHourlyEmployee();
        const amount = generateEmployeePayAmount(employee);
        stubbedCoreActions.fetchAllHourly.resolves([employee]);

        await runHourlyPayroll(friday);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledOnceWith({
            employeeId: employee.id,
            date: friday,
            amount
        });
    });

    it("should insert payments for each employee", async () => {
        const employees = [generateHourlyEmployee(), generateHourlyEmployee()];
        employees.forEach(emp => generateEmployeePayAmount(emp));
        stubbedCoreActions.fetchAllHourly.resolves(employees);

        await runHourlyPayroll(friday);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledTwice;
    });

    function generateEmployeePayAmount(employee: HourlyEmployee): number {
        const amount = generateFloatBetween(100, 500);
        stubbedComputeHourlyEmployeePaymentDueAmount.withArgs(employee).resolves(amount);
        return amount;
    }
});
