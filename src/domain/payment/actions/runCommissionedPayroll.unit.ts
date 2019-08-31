import {
    buildStubbedEmployeeRepository,
    buildStubFor,
    expect,
    generateCommissionedEmployee,
    generateFloatBetween,
    generateIndex,
    lastDayOfMonth,
    Stub
} from "@test/unit";
import { EmployeeRepository } from "../../core";
import { CreatePaymentForEmployee } from "./CreatePaymentForEmployee";
import { buildRunCommissionedPayroll, ComputeEmployeeCommission } from "./runCommissionedPayroll";
import { RunPayroll } from "./RunPayroll";

describe("action runCommissionedPayroll", () => {
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let stubbedComputeEmployeeCommission: Stub<ComputeEmployeeCommission>;
    let stubbedCreatePaymentForEmployee: Stub<CreatePaymentForEmployee>;

    let runCommissionedPayroll: RunPayroll;

    beforeEach(() => {
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        stubbedCreatePaymentForEmployee = buildStubFor("fetchEmployeePaymentMethod");
        stubbedComputeEmployeeCommission = buildStubFor("createPaymentForEmployee");

        runCommissionedPayroll = buildRunCommissionedPayroll({
            employeeRepository: stubbedEmployeeRepository,
            computeEmployeeCommission: stubbedComputeEmployeeCommission,
            createPaymentForEmployee: stubbedCreatePaymentForEmployee
        });

        stubbedComputeEmployeeCommission.resolves(generateIndex());
        stubbedCreatePaymentForEmployee.resolves();
    });

    it("should insert the right payment the employee", async () => {
        const employee = generateCommissionedEmployee();
        const commission = generateFloatBetween(1000, 2000);
        stubbedEmployeeRepository.fetchAllCommissioned.resolves([employee]);
        stubbedComputeEmployeeCommission.resolves(commission);

        await runCommissionedPayroll(lastDayOfMonth);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledOnceWith({
            employeeId: employee.id,
            date: lastDayOfMonth,
            amount: employee.work.monthlySalary + commission
        });
    });

    it("should insert payments for each employee", async () => {
        const employees = [generateCommissionedEmployee(), generateCommissionedEmployee()];
        stubbedEmployeeRepository.fetchAllCommissioned.resolves(employees);

        await runCommissionedPayroll(lastDayOfMonth);

        expect(stubbedCreatePaymentForEmployee).to.have.been.calledTwice;
    });
});
