import {
    buildStubEmployeeRepository,
    buildStubFor,
    expect,
    friday,
    generateFloatBetween,
    generateHourlyEmployee,
    Stub
} from "@test/unit";
import { EmployeeRepository, HourlyEmployee } from "../../core";
import { CreatePaymentForEmployee } from "./CreatePaymentForEmployee";
import { buildRunHourlyPayroll, ComputeHourlyEmployeePaymentDueAmount } from "./runHourlyPayroll";
import { RunPayroll } from "./RunPayroll";

describe("action runHourlyPayroll", () => {
    let stubEmployeeRepository: Stub<EmployeeRepository>;
    let stubComputeHourlyEmployeePaymentDueAmount: Stub<ComputeHourlyEmployeePaymentDueAmount>;
    let stubCreatePaymentForEmployee: Stub<CreatePaymentForEmployee>;

    let runHourlyPayroll: RunPayroll;

    beforeEach(() => {
        stubEmployeeRepository = buildStubEmployeeRepository();
        stubComputeHourlyEmployeePaymentDueAmount = buildStubFor("computeHourlyEmployeePaymentDueAmount");
        stubCreatePaymentForEmployee = buildStubFor("createPaymentForEmployee");

        runHourlyPayroll = buildRunHourlyPayroll({
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
