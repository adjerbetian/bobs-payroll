import {
    buildStubEmployeeRepository,
    buildStubPaymentRepository,
    expect,
    generateSalariedEmployee,
    lastDayOfMonth,
    Stub,
    buildStubFor,
    generatePayment,
    generateHoldPaymentMethod
} from "@test/unit";
import { PaymentMethod, SalariedEmployee } from "../../entities";
import { EmployeeRepository, PaymentRepository } from "../../repositories";
import { FetchEmployeePaymentMethodAction } from "./FetchEmployeePaymentMethodAction";
import { RunPayrollAction } from "./RunPayrollAction";
import { buildRunSalariedPayrollAction } from "./runSalariedPayroll";

describe("action runSalariedPayroll", () => {
    let stubEmployeeRepository: Stub<EmployeeRepository>;
    let stubPaymentRepository: Stub<PaymentRepository>;
    let stubFetchEmployeePaymentMethod: Stub<FetchEmployeePaymentMethodAction>;

    let runSalariedPayroll: RunPayrollAction;

    beforeEach(() => {
        stubEmployeeRepository = buildStubEmployeeRepository();
        stubPaymentRepository = buildStubPaymentRepository();
        stubFetchEmployeePaymentMethod = buildStubFor("fetchEmployeePaymentMethod");

        runSalariedPayroll = buildRunSalariedPayrollAction({
            employeeRepository: stubEmployeeRepository,
            paymentRepository: stubPaymentRepository,
            fetchEmployeePaymentMethod: stubFetchEmployeePaymentMethod
        });

        stubPaymentRepository.insert.resolves();
    });

    it("should insert the right payment the employee", async () => {
        const employee = generateSalariedEmployee();
        const { method } = generateEmployeeModels(employee);
        stubEmployeeRepository.fetchAllSalaried.resolves([employee]);

        await runSalariedPayroll(lastDayOfMonth);

        expect(stubPaymentRepository.insert).to.have.been.calledOnceWith(
            generatePayment({
                employeeId: employee.id,
                date: lastDayOfMonth,
                amount: employee.work.monthlySalary,
                method
            })
        );
    });

    it("should insert payments for each hourly employee", async () => {
        const employee1 = generateSalariedEmployee();
        const employee2 = generateSalariedEmployee();
        generateEmployeeModels(employee1);
        generateEmployeeModels(employee2);
        stubEmployeeRepository.fetchAllSalaried.resolves([employee1, employee2]);

        await runSalariedPayroll(lastDayOfMonth);

        expect(stubPaymentRepository.insert).to.have.been.calledTwice;
    });

    function generateEmployeeModels(employee: SalariedEmployee): { method: PaymentMethod } {
        const method = generateHoldPaymentMethod();
        stubFetchEmployeePaymentMethod.withArgs(employee.id).resolves(method);
        return { method };
    }
});
