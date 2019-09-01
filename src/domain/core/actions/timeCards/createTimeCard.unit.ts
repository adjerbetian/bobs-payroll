import { expect, generateHourlyEmployee, generateSalariedEmployee, generateTimeCard, Stub } from "@test/unit";
import { EmployeeTypeError } from "../../errors";
import { EmployeeRepository, TimeCardRepository } from "../../repositories";
import { buildStubbedEmployeeRepository, buildStubbedTimeCardRepository } from "../../test";
import { buildCreateTimeCard } from "./createTimeCard";

describe("action createTimeCard", () => {
    let stubbedTimeCardRepository: Stub<TimeCardRepository>;
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let createTimeCard: ReturnType<typeof buildCreateTimeCard>;

    beforeEach(() => {
        stubbedTimeCardRepository = buildStubbedTimeCardRepository();
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        createTimeCard = buildCreateTimeCard({
            employeeRepository: stubbedEmployeeRepository,
            timeCardRepository: stubbedTimeCardRepository
        });

        stubbedTimeCardRepository.insert.resolves();
    });

    it("should create a time card for the employee", async () => {
        const timeCard = generateTimeCard();
        stubbedEmployeeRepository.fetchById.withArgs(timeCard.employeeId).resolves(generateHourlyEmployee());

        await createTimeCard(timeCard);

        expect(stubbedTimeCardRepository.insert).to.have.been.calledOnceWith(timeCard);
    });
    it("should throw a EmployeeTypeError if the employee is not hourly", async () => {
        const timeCard = generateTimeCard();
        stubbedEmployeeRepository.fetchById.withArgs(timeCard.employeeId).resolves(generateSalariedEmployee());

        const promise = createTimeCard(timeCard);

        await expect(promise).to.be.rejectedWith(EmployeeTypeError);
    });
});
