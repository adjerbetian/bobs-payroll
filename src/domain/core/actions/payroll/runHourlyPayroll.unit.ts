import { friday, lastFriday, never } from "../../../../../test/dates";
import {
    buildFakeEmployeeRepository,
    buildFakePaymentMethodRepository,
    buildFakePaymentRepository,
    buildFakeTimeCardRepository,
    Fake
} from "../../../../../test/fakeBuilders";
import { generateHoldPaymentMethod, generateHourlyEmployee, generateTimeCard } from "../../../../../test/generators";
import { expect } from "../../../../../test/unitTest";
import { HourlyEmployee, Payment, PaymentMethod } from "../../entities";
import { EmployeeRepository, PaymentMethodRepository, PaymentRepository, TimeCardRepository } from "../../repositories";
import { buildRunHourlyPayrollAction } from "./runHourlyPayroll";
import { RunPayrollAction } from "./RunPayrollAction";

describe("action runHourlyPayroll", () => {
    let fakePaymentRepository: Fake<PaymentRepository>;
    let fakeEmployeeRepository: Fake<EmployeeRepository>;
    let fakeTimeCardRepository: Fake<TimeCardRepository>;
    let fakePaymentMethodRepository: Fake<PaymentMethodRepository>;

    let runHourlyPayroll: RunPayrollAction;

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
        fakeTimeCardRepository.fetchAllOfEmployeeSince.resolves([]);
    });

    let employee: HourlyEmployee;
    let method: PaymentMethod;

    beforeEach(async () => {
        employee = await generateHourlyEmployee();
        method = await generateHoldPaymentMethod();

        fakeEmployeeRepository.fetchAllHourly.resolves([employee]);
        fakePaymentMethodRepository.fetchByEmployeeId.withArgs(employee.id).resolves(method);
        fakePaymentRepository.fetchEmployeeLastPaymentDate.withArgs(employee.id).resolves(never);
    });

    it("should pay the hours made on the employee's time cards", async () => {
        const timeCard1 = generateTimeCard();
        const timeCard2 = generateTimeCard();
        fakeTimeCardRepository.fetchAllOfEmployeeSince.withArgs(employee.id).resolves([timeCard1, timeCard2]);

        await runHourlyPayroll(friday);

        const insertedPayment = getInsertedPayment();
        expect(insertedPayment.amount).equal((timeCard1.hours + timeCard2.hours) * employee.work.hourlyRate);
    });
    it("should not include the time cards already paid", async () => {
        const timeCard = generateTimeCard();
        fakePaymentRepository.fetchEmployeeLastPaymentDate.withArgs(employee.id).resolves(lastFriday);
        fakeTimeCardRepository.fetchAllOfEmployeeSince.withArgs(employee.id, lastFriday).resolves([timeCard]);

        await runHourlyPayroll(friday);

        const insertedPayment = getInsertedPayment();
        expect(insertedPayment.amount).to.equal(timeCard.hours * employee.work.hourlyRate);
    });
    it("should pay 1.5 time the normal rate for extra hours (>8h a day)", async () => {
        const timeCard = generateTimeCard({ hours: 8 + 2 });
        fakeTimeCardRepository.fetchAllOfEmployeeSince.withArgs(employee.id).resolves([timeCard]);

        await runHourlyPayroll(friday);

        const insertedPayment = getInsertedPayment();
        expect(insertedPayment.amount).to.equal((8 + 2 * 1.5) * employee.work.hourlyRate);
    });

    function getInsertedPayment(): Payment {
        return fakePaymentRepository.insert.getCall(0).args[0];
    }
});
