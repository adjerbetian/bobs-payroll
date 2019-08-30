import { lastFriday, never } from "../../../../../../test/dates";
import { buildFakePaymentRepository, buildFakeTimeCardRepository, Fake } from "../../../../../../test/fakeBuilders";
import { generateHourlyEmployee, generateTimeCard } from "../../../../../../test/generators";
import { expect } from "../../../../../../test/unitTest";
import { HourlyEmployee } from "../../../entities";
import { PaymentRepository, TimeCardRepository } from "../../../repositories";
import {
    buildComputeHourlyEmployeePaymentDueAmountAction,
    ComputeHourlyEmployeePaymentDueAmountAction
} from "./computeHourlyEmployeePaymentDueAmount";

describe("action computeHourlyEmployeePaymentDueAmount", () => {
    let fakePaymentRepository: Fake<PaymentRepository>;
    let fakeTimeCardRepository: Fake<TimeCardRepository>;

    let computeHourlyEmployeePaymentDueAmount: ComputeHourlyEmployeePaymentDueAmountAction;
    let employee: HourlyEmployee;

    beforeEach(() => {
        fakePaymentRepository = buildFakePaymentRepository();
        fakeTimeCardRepository = buildFakeTimeCardRepository();

        computeHourlyEmployeePaymentDueAmount = buildComputeHourlyEmployeePaymentDueAmountAction({
            paymentRepository: fakePaymentRepository,
            timeCardRepository: fakeTimeCardRepository
        });

        fakePaymentRepository.insert.resolves();
        fakeTimeCardRepository.fetchAllOfEmployeeSince.resolves([]);
        employee = generateHourlyEmployee();
        fakePaymentRepository.fetchEmployeeLastPaymentDate.withArgs(employee.id).resolves(never);
    });

    it("should take into account the regular hours made on the employee's time cards", async () => {
        const timeCard1 = generateTimeCard();
        const timeCard2 = generateTimeCard();
        fakeTimeCardRepository.fetchAllOfEmployeeSince.withArgs(employee.id).resolves([timeCard1, timeCard2]);

        const amount = await computeHourlyEmployeePaymentDueAmount(employee);

        expect(amount).to.equal((timeCard1.hours + timeCard2.hours) * employee.work.hourlyRate);
    });
    it("should not include the time cards already paid", async () => {
        const timeCard = generateTimeCard();
        fakePaymentRepository.fetchEmployeeLastPaymentDate.withArgs(employee.id).resolves(lastFriday);
        fakeTimeCardRepository.fetchAllOfEmployeeSince.withArgs(employee.id, lastFriday).resolves([timeCard]);

        const amount = await computeHourlyEmployeePaymentDueAmount(employee);

        expect(amount).to.equal(timeCard.hours * employee.work.hourlyRate);
    });
    it("should pay 1.5 time the normal rate for extra hours (>8h a day)", async () => {
        const timeCard = generateTimeCard({ hours: 8 + 2 });
        fakeTimeCardRepository.fetchAllOfEmployeeSince.withArgs(employee.id).resolves([timeCard]);

        const amount = await computeHourlyEmployeePaymentDueAmount(employee);

        expect(amount).to.equal((8 + 2 * 1.5) * employee.work.hourlyRate);
    });
});
