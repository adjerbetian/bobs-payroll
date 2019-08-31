import {
    buildStubEmployeeRepository,
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
    let stubEmployeeRepository: Stub<EmployeeRepository>;
    let stubCreatePaymentForEmployee: Stub<CreatePaymentForEmployee>;

    let runSalariedPayroll: RunPayroll;

    beforeEach(() => {
        stubEmployeeRepository = buildStubEmployeeRepository();
        stubCreatePaymentForEmployee = buildStubFor("createPaymentForEmployee");

        runSalariedPayroll = buildRunSalariedPayroll({
            employeeRepository: stubEmployeeRepository,
            createPaymentForEmployee: stubCreatePaymentForEmployee
        });

        stubCreatePaymentForEmployee.resolves();
    });

    it("should insert the right payment the employee", async () => {
        const employee = generateSalariedEmployee();
        stubEmployeeRepository.fetchAllSalaried.resolves([employee]);

        await runSalariedPayroll(lastDayOfMonth);

        expect(stubCreatePaymentForEmployee).to.have.been.calledOnceWith({
            employeeId: employee.id,
            date: lastDayOfMonth,
            amount: employee.work.monthlySalary
        });
    });

    it("should insert payments for each employee", async () => {
        const employees = [generateSalariedEmployee(), generateSalariedEmployee()];
        stubEmployeeRepository.fetchAllSalaried.resolves(employees);

        await runSalariedPayroll(lastDayOfMonth);

        expect(stubCreatePaymentForEmployee).to.have.been.calledTwice;
    });
});
