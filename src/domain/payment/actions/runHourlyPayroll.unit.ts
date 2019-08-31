import { buildStubFor, expect, friday, generateFloatBetween, generateHourlyEmployee, Stub } from "@test/unit";
import { EmployeeRepository, HourlyEmployee } from "../../core";
import { buildStubbedEmployeeRepository } from "../../core/test";
import { CreatePaymentForEmployee } from "./CreatePaymentForEmployee";
import { buildRunHourlyPayroll, ComputeHourlyEmployeePaymentDueAmount } from "./runHourlyPayroll";
import { RunPayroll } from "./RunPayroll";

describe("action runHourlyPayroll", () => {
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let stubbedComputeHourlyEmployeePaymentDueAmount: Stub<ComputeHourlyEmployeePaymentDueAmount>;
    let stubbedCreatePaymentForEmployee: Stub<CreatePaymentForEmployee>;

    let runHourlyPayroll: RunPayroll;

    beforeEach(() => {
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        stubbedComputeHourlyEmployeePaymentDueAmount = buildStubFor("computeHourlyEmployeePaymentDueAmount");
        stubbedCreatePaymentForEmployee = buildStubFor("createPaymentForEmployee");

        runHourlyPayroll = buildRunHourlyPayroll({
            employeeRepository: stubbedEmployeeRepository,
            computeHourlyEmployeePaymentDueAmount: stubbedComputeHourlyEmployeePaymentDueAmount,
            createPaymentForEmployee: stubbedCreatePaymentForEmployee
        });

        stubbedCreatePaymentForEmployee.resolves();
    });

    it("should insert the right payment the employee", async () => {
        const employee = generateHourlyEmployee();
        const amount = generateEmployeePayAmount(employee);
        stubbedEmployeeRepository.fetchAllHourly.resolves([employee]);

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
        stubbedEmployeeRepository.fetchAllHourly.resolves(employees);

        await runHourlyPayroll(friday);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledTwice;
    });

    function generateEmployeePayAmount(employee: HourlyEmployee): number {
        const amount = generateFloatBetween(100, 500);
        stubbedComputeHourlyEmployeePaymentDueAmount.withArgs(employee).resolves(amount);
        return amount;
    }
});
