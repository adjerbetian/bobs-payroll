import {
    buildStubbedCoreActions,
    buildStubFor,
    expect,
    friday,
    generateFloatBetween,
    generateHourlyEmployee,
    Stub
} from "@test/unit";
import { CoreActions, HourlyEmployee } from "../../../../core";
import { CreatePaymentForEmployee } from "../../payment";
import { buildRunHourlyPayroll, ComputeHourlyEmployeePaymentDueAmount } from "./runHourlyPayroll";

describe("action runHourlyPayroll", () => {
    let stubbedCoreActions: Stub<CoreActions>;
    let stubbedComputeHourlyEmployeePaymentDueAmount: Stub<ComputeHourlyEmployeePaymentDueAmount>;
    let stubbedCreatePaymentForEmployee: Stub<CreatePaymentForEmployee>;

    let runHourlyPayroll: ReturnType<typeof buildRunHourlyPayroll>;

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
        stubbedCoreActions.fetchAllHourlyEmployees.resolves([employee]);

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
        stubbedCoreActions.fetchAllHourlyEmployees.resolves(employees);

        await runHourlyPayroll(friday);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledTwice;
    });

    function generateEmployeePayAmount(employee: HourlyEmployee): number {
        const amount = generateFloatBetween(100, 500);
        stubbedComputeHourlyEmployeePaymentDueAmount.withArgs(employee).resolves(amount);
        return amount;
    }
});
