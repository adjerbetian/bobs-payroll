import { friday, monday, tuesday } from "../../../../../test/dates";
import {
    buildFakeEmployeeRepository,
    buildFakePaymentMethodRepository,
    buildFakePaymentRepository,
    buildFakeTimeCardRepository,
    Fake
} from "../../../../../test/fakeBuilders";
import { generateHoldPaymentMethod, generateHourlyEmployee, generateTimeCard } from "../../../../../test/generators";
import { expect } from "../../../../../test/unitTest";
import { HourlyEmployee, Payment, PaymentMethod, TimeCard } from "../../entities";
import { EmployeeRepository, PaymentMethodRepository, PaymentRepository, TimeCardRepository } from "../../repositories";
import { RunPayrollAction } from "../runPayroll";
import { buildRunHourlyPayrollAction } from "./runHourlyPayroll";

describe("action runHourlyPayroll", () => {
    let fakePaymentRepository: Fake<PaymentRepository>;
    let fakeEmployeeRepository: Fake<EmployeeRepository>;
    let fakeTimeCardRepository: Fake<TimeCardRepository>;
    let fakePaymentMethodRepository: Fake<PaymentMethodRepository>;

    let runHourlyPayroll: RunPayrollAction;

    let employee: HourlyEmployee;
    let timeCards: TimeCard[];
    let method: PaymentMethod;

    beforeEach(() => {
        fakePaymentRepository = buildFakePaymentRepository();
        fakeEmployeeRepository = buildFakeEmployeeRepository();
        fakeTimeCardRepository = buildFakeTimeCardRepository();
        fakePaymentMethodRepository = buildFakePaymentMethodRepository();

        runHourlyPayroll = buildRunHourlyPayrollAction({
            paymentRepository: fakePaymentRepository,
            employeeRepository: fakeEmployeeRepository,
            timeCardRepository: fakeTimeCardRepository,
            paymentMethodRepository: fakePaymentMethodRepository
        });

        fakePaymentRepository.insert.resolves();
    });

    beforeEach(async () => {
        employee = await generateHourlyEmployee();
        method = await generateHoldPaymentMethod();
        timeCards = [
            await generateTimeCard({ date: monday, hours: 5 }),
            await generateTimeCard({ date: tuesday, hours: 6 })
        ];

        fakeEmployeeRepository.fetchAllHourly.resolves([employee]);
        fakeTimeCardRepository.fetchAllOfEmployee.withArgs(employee.id).resolves(timeCards);
    });

    it("should pay the hours made in his time cards", async () => {
        await runHourlyPayroll(`Payroll ${friday}`);

        const workedHours = timeCards.reduce((total, tc) => total + tc.hours, 0);
        const expectedPayment: Payment = {
            employeeId: employee.id,
            date: friday,
            amount: workedHours * employee.work.hourlyRate,
            method: method
        };
        expect(fakePaymentRepository.insert).to.have.been.calledOnceWith(expectedPayment);
    });
    it.skip("should not include the time cards already paid", async () => {});
    it.skip("should not pay if it's not Friday", async () => {});
    it.skip("should pay 1.5 time the normal rate for extra hours (>8h a day)", async () => {});
    it.skip("work on a complex example", async () => {});
});
