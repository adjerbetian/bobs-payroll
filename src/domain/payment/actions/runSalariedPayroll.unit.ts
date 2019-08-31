import {
    buildStubbedEmployeeRepository,
    buildStubFor,
    expect,
    generateSalariedEmployee,
    lastDayOfMonth,
    Stub
} from "@test/unit";
import { EmployeeRepository } from "../../core";
import { CreatePaymentForEmployee } from "./CreatePaymentForEmployee";
import { RunPayroll } from "./RunPayroll";
import { buildRunSalariedPayroll } from "./runSalariedPayroll";

describe("action runSalariedPayroll", () => {
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let stubbedCreatePaymentForEmployee: Stub<CreatePaymentForEmployee>;

    let runSalariedPayroll: RunPayroll;

    beforeEach(() => {
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        stubbedCreatePaymentForEmployee = buildStubFor("createPaymentForEmployee");

        runSalariedPayroll = buildRunSalariedPayroll({
            employeeRepository: stubbedEmployeeRepository,
            createPaymentForEmployee: stubbedCreatePaymentForEmployee
        });

        stubbedCreatePaymentForEmployee.resolves();
    });

    it("should insert the right payment the employee", async () => {
        const employee = generateSalariedEmployee();
        stubbedEmployeeRepository.fetchAllSalaried.resolves([employee]);

        await runSalariedPayroll(lastDayOfMonth);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledOnceWith({
            employeeId: employee.id,
            date: lastDayOfMonth,
            amount: employee.work.monthlySalary
        });
    });

    it("should insert payments for each employee", async () => {
        const employees = [generateSalariedEmployee(), generateSalariedEmployee()];
        stubbedEmployeeRepository.fetchAllSalaried.resolves(employees);

        await runSalariedPayroll(lastDayOfMonth);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledTwice;
    });
});
