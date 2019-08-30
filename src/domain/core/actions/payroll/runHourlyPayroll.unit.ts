import { friday } from "../../../../../test/dates";
import {
    buildStubEmployeeRepository,
    buildStubPaymentRepository,
    buildStubFor,
    Stub
} from "../../../../../test/stubBuilders";
import {
    generateFloatBetween,
    generateHoldPaymentMethod,
    generateHourlyEmployee,
    generatePayment
} from "../../../../../test/generators";
import { expect } from "../../../../../test/unitTest";
import { HourlyEmployee, PaymentMethod } from "../../entities";
import { EmployeeRepository, PaymentRepository } from "../../repositories";
import {
    buildRunHourlyPayrollAction,
    ComputeHourlyEmployeePaymentDueAmountAction,
    FetchEmployeePaymentMethodAction
} from "./runHourlyPayroll";
import { RunPayrollAction } from "./RunPayrollAction";

describe("action runHourlyPayroll", () => {
    let stubEmployeeRepository: Stub<EmployeeRepository>;
    let stubPaymentRepository: Stub<PaymentRepository>;
    let stubComputeHourlyEmployeePaymentDueAmount: Stub<ComputeHourlyEmployeePaymentDueAmountAction>;
    let stubFetchEmployeePaymentMethod: Stub<FetchEmployeePaymentMethodAction>;

    let runHourlyPayroll: RunPayrollAction;

    beforeEach(() => {
        stubEmployeeRepository = buildStubEmployeeRepository();
        stubPaymentRepository = buildStubPaymentRepository();
        stubComputeHourlyEmployeePaymentDueAmount = buildStubFor("computeHourlyEmployeePaymentDueAmount");
        stubFetchEmployeePaymentMethod = buildStubFor("fetchEmployeePaymentMethod");

        runHourlyPayroll = buildRunHourlyPayrollAction({
            employeeRepository: stubEmployeeRepository,
            paymentRepository: stubPaymentRepository,
            computeHourlyEmployeePaymentDueAmount: stubComputeHourlyEmployeePaymentDueAmount,
            fetchEmployeePaymentMethod: stubFetchEmployeePaymentMethod
        });

        stubPaymentRepository.insert.resolves();
    });

    it("should insert the right payment the employee", async () => {
        const employee = generateHourlyEmployee();
        const { amount, method } = generateEmployeeModels(employee);
        stubEmployeeRepository.fetchAllHourly.resolves([employee]);

        await runHourlyPayroll(friday);

        expect(stubPaymentRepository.insert).to.have.been.calledOnceWith(
            generatePayment({
                employeeId: employee.id,
                date: friday,
                amount,
                method
            })
        );
    });

    it("should insert payments for each hourly employee", async () => {
        const employee1 = generateHourlyEmployee();
        const employee2 = generateHourlyEmployee();
        generateEmployeeModels(employee1);
        generateEmployeeModels(employee2);
        stubEmployeeRepository.fetchAllHourly.resolves([employee1, employee2]);

        await runHourlyPayroll(friday);

        expect(stubPaymentRepository.insert).to.have.been.calledTwice;
    });

    function generateEmployeeModels(employee: HourlyEmployee): { amount: number; method: PaymentMethod } {
        const amount = generateFloatBetween(100, 500);
        const method = generateHoldPaymentMethod();
        stubComputeHourlyEmployeePaymentDueAmount.withArgs(employee).resolves(amount);
        stubFetchEmployeePaymentMethod.withArgs(employee.id).resolves(method);
        return { amount, method };
    }
});
