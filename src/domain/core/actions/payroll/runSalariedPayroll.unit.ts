import {
    buildStubEmployeeRepository,
    buildStubFor,
    expect,
    generateSalariedEmployee,
    lastDayOfMonth,
    Stub
} from "@test/unit";
import { EmployeeRepository } from "../../repositories";
import { CreatePaymentForEmployeeAction } from "./CreatePaymentForEmployeeAction";
import { RunPayrollAction } from "./RunPayrollAction";
import { buildRunSalariedPayrollAction } from "./runSalariedPayroll";

describe("action runSalariedPayroll", () => {
    let stubEmployeeRepository: Stub<EmployeeRepository>;
    let stubCreatePaymentForEmployee: Stub<CreatePaymentForEmployeeAction>;

    let runSalariedPayroll: RunPayrollAction;

    beforeEach(() => {
        stubEmployeeRepository = buildStubEmployeeRepository();
        stubCreatePaymentForEmployee = buildStubFor("createPaymentForEmployee");

        runSalariedPayroll = buildRunSalariedPayrollAction({
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
