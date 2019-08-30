import { friday } from "../../../../../test/dates";
import {
    buildFakeEmployeeRepository,
    buildFakePaymentRepository,
    buildStubFor,
    Fake
} from "../../../../../test/fakeBuilders";
import {
    generateFloatBetween,
    generateHoldPaymentMethod,
    generateHourlyEmployee,
    generatePayment
} from "../../../../../test/generators";
import { expect } from "../../../../../test/unitTest";
import { HourlyEmployee, PaymentMethod } from "../../entities";
import { EmployeeRepository, PaymentRepository } from "../../repositories";
import { ComputeHourlyEmployeePaymentDueAmountAction, FetchEmployeePaymentMethodAction } from "./actions";
import { buildRunHourlyPayrollAction } from "./runHourlyPayroll";
import { RunPayrollAction } from "./RunPayrollAction";

describe("action runHourlyPayroll", () => {
    let fakeEmployeeRepository: Fake<EmployeeRepository>;
    let fakePaymentRepository: Fake<PaymentRepository>;
    let fakeComputeHourlyEmployeePaymentDueAmount: Fake<ComputeHourlyEmployeePaymentDueAmountAction>;
    let fakeFetchEmployeePaymentMethod: Fake<FetchEmployeePaymentMethodAction>;

    let runHourlyPayroll: RunPayrollAction;

    beforeEach(() => {
        fakeEmployeeRepository = buildFakeEmployeeRepository();
        fakePaymentRepository = buildFakePaymentRepository();
        fakeComputeHourlyEmployeePaymentDueAmount = buildStubFor("computeHourlyEmployeePaymentDueAmount");
        fakeFetchEmployeePaymentMethod = buildStubFor("fetchEmployeePaymentMethod");

        runHourlyPayroll = buildRunHourlyPayrollAction(
            {
                employeeRepository: fakeEmployeeRepository,
                paymentRepository: fakePaymentRepository
            },
            {
                computeHourlyEmployeePaymentDueAmount: fakeComputeHourlyEmployeePaymentDueAmount,
                fetchEmployeePaymentMethod: fakeFetchEmployeePaymentMethod
            }
        );

        fakePaymentRepository.insert.resolves();
    });

    it("should insert the right payment the employee", async () => {
        const employee = generateHourlyEmployee();
        const { amount, method } = generateEmployeeModels(employee);
        fakeEmployeeRepository.fetchAllHourly.resolves([employee]);

        await runHourlyPayroll(friday);

        expect(fakePaymentRepository.insert).to.have.been.calledOnceWith(
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
        fakeEmployeeRepository.fetchAllHourly.resolves([employee1, employee2]);

        await runHourlyPayroll(friday);

        expect(fakePaymentRepository.insert).to.have.been.calledTwice;
    });

    function generateEmployeeModels(employee: HourlyEmployee): { amount: number; method: PaymentMethod } {
        const amount = generateFloatBetween(100, 500);
        const method = generateHoldPaymentMethod();
        fakeComputeHourlyEmployeePaymentDueAmount.withArgs(employee).resolves(amount);
        fakeFetchEmployeePaymentMethod.withArgs(employee.id).resolves(method);
        return { amount, method };
    }
});
