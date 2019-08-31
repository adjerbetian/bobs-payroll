import {
    buildStubEmployeeRepository,
    buildStubPaymentRepository,
    expect,
    generateCommissionedEmployee,
    lastDayOfMonth,
    Stub,
    buildStubFor,
    generatePayment,
    generateHoldPaymentMethod
} from "@test/unit";
import { PaymentMethod, CommissionedEmployee } from "../../entities";
import { EmployeeRepository, PaymentRepository } from "../../repositories";
import { FetchEmployeePaymentMethodAction } from "./FetchEmployeePaymentMethodAction";
import { RunPayrollAction } from "./RunPayrollAction";
import { buildRunCommissionedPayrollAction } from "./runCommissionedPayroll";

describe("action runCommissionedPayroll", () => {
    let stubEmployeeRepository: Stub<EmployeeRepository>;
    let stubPaymentRepository: Stub<PaymentRepository>;
    let stubFetchEmployeePaymentMethod: Stub<FetchEmployeePaymentMethodAction>;

    let runCommissionedPayroll: RunPayrollAction;

    beforeEach(() => {
        stubEmployeeRepository = buildStubEmployeeRepository();
        stubPaymentRepository = buildStubPaymentRepository();
        stubFetchEmployeePaymentMethod = buildStubFor("fetchEmployeePaymentMethod");

        runCommissionedPayroll = buildRunCommissionedPayrollAction({
            employeeRepository: stubEmployeeRepository,
            paymentRepository: stubPaymentRepository,
            fetchEmployeePaymentMethod: stubFetchEmployeePaymentMethod
        });

        stubPaymentRepository.insert.resolves();
    });

    it("should insert the right payment the employee", async () => {
        const employee = generateCommissionedEmployee();
        const { method } = generateEmployeeModels(employee);
        stubEmployeeRepository.fetchAllCommissioned.resolves([employee]);

        await runCommissionedPayroll(lastDayOfMonth);

        expect(stubPaymentRepository.insert).to.have.been.calledOnceWith(
            generatePayment({
                employeeId: employee.id,
                date: lastDayOfMonth,
                amount: employee.work.monthlySalary,
                method
            })
        );
    });

    it("should insert payments for each employee", async () => {
        const employee1 = generateCommissionedEmployee();
        const employee2 = generateCommissionedEmployee();
        generateEmployeeModels(employee1);
        generateEmployeeModels(employee2);
        stubEmployeeRepository.fetchAllCommissioned.resolves([employee1, employee2]);

        await runCommissionedPayroll(lastDayOfMonth);

        expect(stubPaymentRepository.insert).to.have.been.calledTwice;
    });

    function generateEmployeeModels(employee: CommissionedEmployee): { method: PaymentMethod } {
        const method = generateHoldPaymentMethod();
        stubFetchEmployeePaymentMethod.withArgs(employee.id).resolves(method);
        return { method };
    }
});
