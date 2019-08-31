import {
    buildStubEmployeeRepository,
    buildStubFor,
    expect,
    generateCommissionedEmployee,
    lastDayOfMonth,
    Stub
} from "@test/unit";
import { EmployeeRepository } from "../../repositories";
import { CreatePaymentForEmployeeAction } from "./CreatePaymentForEmployeeAction";
import { buildRunCommissionedPayrollAction } from "./runCommissionedPayroll";
import { RunPayrollAction } from "./RunPayrollAction";

describe("action runCommissionedPayroll", () => {
    let stubEmployeeRepository: Stub<EmployeeRepository>;
    let stubCreatePaymentForEmployee: Stub<CreatePaymentForEmployeeAction>;

    let runCommissionedPayroll: RunPayrollAction;

    beforeEach(() => {
        stubEmployeeRepository = buildStubEmployeeRepository();
        stubCreatePaymentForEmployee = buildStubFor("fetchEmployeePaymentMethod");

        runCommissionedPayroll = buildRunCommissionedPayrollAction({
            employeeRepository: stubEmployeeRepository,
            createPaymentForEmployee: stubCreatePaymentForEmployee
        });

        stubCreatePaymentForEmployee.resolves();
    });

    it("should insert the right payment the employee", async () => {
        const employee = generateCommissionedEmployee();
        stubEmployeeRepository.fetchAllCommissioned.resolves([employee]);

        await runCommissionedPayroll(lastDayOfMonth);

        expect(stubCreatePaymentForEmployee).to.have.been.calledOnceWith({
            employeeId: employee.id,
            date: lastDayOfMonth,
            amount: employee.work.monthlySalary
        });
    });

    it("should insert payments for each employee", async () => {
        const employees = [generateCommissionedEmployee(), generateCommissionedEmployee()];
        stubEmployeeRepository.fetchAllCommissioned.resolves(employees);

        await runCommissionedPayroll(lastDayOfMonth);

        expect(stubCreatePaymentForEmployee).to.have.been.calledTwice;
    });
});
