import {
    buildStubEmployeeRepository,
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
    let stubEmployeeRepository: Stub<EmployeeRepository>;
    let stubComputeEmployeeCommission: Stub<ComputeEmployeeCommission>;
    let stubCreatePaymentForEmployee: Stub<CreatePaymentForEmployee>;

    let runCommissionedPayroll: RunPayroll;

    beforeEach(() => {
        stubEmployeeRepository = buildStubEmployeeRepository();
        stubCreatePaymentForEmployee = buildStubFor("fetchEmployeePaymentMethod");
        stubComputeEmployeeCommission = buildStubFor("createPaymentForEmployee");

        runCommissionedPayroll = buildRunCommissionedPayroll({
            employeeRepository: stubEmployeeRepository,
            computeEmployeeCommission: stubComputeEmployeeCommission,
            createPaymentForEmployee: stubCreatePaymentForEmployee
        });

        stubComputeEmployeeCommission.resolves(generateIndex());
        stubCreatePaymentForEmployee.resolves();
    });

    it("should insert the right payment the employee", async () => {
        const employee = generateCommissionedEmployee();
        const commission = generateFloatBetween(1000, 2000);
        stubEmployeeRepository.fetchAllCommissioned.resolves([employee]);
        stubComputeEmployeeCommission.resolves(commission);

        await runCommissionedPayroll(lastDayOfMonth);

        expect(stubCreatePaymentForEmployee).to.have.been.calledOnceWith({
            employeeId: employee.id,
            date: lastDayOfMonth,
            amount: employee.work.monthlySalary + commission
        });
    });

    it("should insert payments for each employee", async () => {
        const employees = [generateCommissionedEmployee(), generateCommissionedEmployee()];
        stubEmployeeRepository.fetchAllCommissioned.resolves(employees);

        await runCommissionedPayroll(lastDayOfMonth);

        expect(stubCreatePaymentForEmployee).to.have.been.calledTwice;
    });
});
