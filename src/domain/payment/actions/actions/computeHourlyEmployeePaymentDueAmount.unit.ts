import {
    buildStubPaymentRepository,
    buildStubTimeCardRepository,
    expect,
    generateHourlyEmployee,
    generateTimeCard,
    lastFriday,
    never,
    Stub
} from "@test/unit";
import { HourlyEmployee, TimeCardRepository } from "../../../core";
import { PaymentRepository } from "../../repositories";
import { buildComputeHourlyEmployeePaymentDueAmount } from "./computeHourlyEmployeePaymentDueAmount";

describe("action computeHourlyEmployeePaymentDueAmount", () => {
    let stubPaymentRepository: Stub<PaymentRepository>;
    let stubTimeCardRepository: Stub<TimeCardRepository>;

    let computeHourlyEmployeePaymentDueAmount: ReturnType<typeof buildComputeHourlyEmployeePaymentDueAmount>;
    let employee: HourlyEmployee;

    beforeEach(() => {
        stubPaymentRepository = buildStubPaymentRepository();
        stubTimeCardRepository = buildStubTimeCardRepository();

        computeHourlyEmployeePaymentDueAmount = buildComputeHourlyEmployeePaymentDueAmount({
            paymentRepository: stubPaymentRepository,
            timeCardRepository: stubTimeCardRepository
        });

        stubPaymentRepository.insert.resolves();
        stubTimeCardRepository.fetchAllOfEmployeeSince.resolves([]);
        employee = generateHourlyEmployee();
        stubPaymentRepository.fetchEmployeeLastPaymentDate.withArgs(employee.id).resolves(never);
    });

    it("should take into account the regular hours made on the employee's time cards", async () => {
        const timeCard1 = generateTimeCard();
        const timeCard2 = generateTimeCard();
        stubTimeCardRepository.fetchAllOfEmployeeSince.withArgs(employee.id).resolves([timeCard1, timeCard2]);

        const amount = await computeHourlyEmployeePaymentDueAmount(employee);

        expect(amount).to.equal((timeCard1.hours + timeCard2.hours) * employee.work.hourlyRate);
    });
    it("should not include the time cards already paid", async () => {
        const timeCard = generateTimeCard();
        stubPaymentRepository.fetchEmployeeLastPaymentDate.withArgs(employee.id).resolves(lastFriday);
        stubTimeCardRepository.fetchAllOfEmployeeSince.withArgs(employee.id, lastFriday).resolves([timeCard]);

        const amount = await computeHourlyEmployeePaymentDueAmount(employee);

        expect(amount).to.equal(timeCard.hours * employee.work.hourlyRate);
    });
    it("should pay 1.5 time the normal rate for extra hours (>8h a day)", async () => {
        const timeCard = generateTimeCard({ hours: 8 + 2 });
        stubTimeCardRepository.fetchAllOfEmployeeSince.withArgs(employee.id).resolves([timeCard]);

        const amount = await computeHourlyEmployeePaymentDueAmount(employee);

        expect(amount).to.equal((8 + 2 * 1.5) * employee.work.hourlyRate);
    });
});
