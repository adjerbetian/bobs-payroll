import {
    buildStubEmployeeRepository,
    buildStubFor,
    expect,
    friday,
    generateFloatBetween,
    generateHourlyEmployee,
    Stub
} from "@test/unit";
import { HourlyEmployee } from "../../entities";
import { EmployeeRepository } from "../../repositories";
import { CreatePaymentForEmployeeAction } from "./CreatePaymentForEmployeeAction";
import { buildRunHourlyPayrollAction, ComputeHourlyEmployeePaymentDueAmountAction } from "./runHourlyPayroll";
import { RunPayrollAction } from "./RunPayrollAction";

describe("action runHourlyPayroll", () => {
    let stubEmployeeRepository: Stub<EmployeeRepository>;
    let stubComputeHourlyEmployeePaymentDueAmount: Stub<ComputeHourlyEmployeePaymentDueAmountAction>;
    let stubCreatePaymentForEmployee: Stub<CreatePaymentForEmployeeAction>;

    let runHourlyPayroll: RunPayrollAction;

    beforeEach(() => {
        stubEmployeeRepository = buildStubEmployeeRepository();
        stubComputeHourlyEmployeePaymentDueAmount = buildStubFor("computeHourlyEmployeePaymentDueAmount");
        stubCreatePaymentForEmployee = buildStubFor("createPaymentForEmployee");

        runHourlyPayroll = buildRunHourlyPayrollAction({
            employeeRepository: stubEmployeeRepository,
            computeHourlyEmployeePaymentDueAmount: stubComputeHourlyEmployeePaymentDueAmount,
            createPaymentForEmployee: stubCreatePaymentForEmployee
        });

        stubCreatePaymentForEmployee.resolves();
    });

    it("should insert the right payment the employee", async () => {
        const employee = generateHourlyEmployee();
        const amount = generateEmployeePayAmount(employee);
        stubEmployeeRepository.fetchAllHourly.resolves([employee]);

        await runHourlyPayroll(friday);

        expect(stubCreatePaymentForEmployee).to.have.been.calledOnceWith({
            employeeId: employee.id,
            date: friday,
            amount
        });
    });

    it("should insert payments for each employee", async () => {
        const employees = [generateHourlyEmployee(), generateHourlyEmployee()];
        employees.forEach(emp => generateEmployeePayAmount(emp));
        stubEmployeeRepository.fetchAllHourly.resolves(employees);

        await runHourlyPayroll(friday);

        expect(stubCreatePaymentForEmployee).to.have.been.calledTwice;
    });

    function generateEmployeePayAmount(employee: HourlyEmployee): number {
        const amount = generateFloatBetween(100, 500);
        stubComputeHourlyEmployeePaymentDueAmount.withArgs(employee).resolves(amount);
        return amount;
    }
});
