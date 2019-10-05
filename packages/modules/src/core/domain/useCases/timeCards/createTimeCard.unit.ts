import { expect, Stub } from "@bobs-payroll/test";
import { generators } from "../../../../test";
import { EmployeeTypeError } from "../../errors";
import { EmployeeRepository, TimeCardRepository } from "../../repositories";
import { buildStubbedEmployeeRepository, buildStubbedTimeCardRepository } from "../../test";
import { makeCreateTimeCard } from "./createTimeCard";

describe("use case - createTimeCard", () => {
    let stubbedTimeCardRepository: Stub<TimeCardRepository>;
    let stubbedEmployeeRepository: Stub<EmployeeRepository>;
    let createTimeCard: ReturnType<typeof makeCreateTimeCard>;

    beforeEach(() => {
        stubbedTimeCardRepository = buildStubbedTimeCardRepository();
        stubbedEmployeeRepository = buildStubbedEmployeeRepository();
        createTimeCard = makeCreateTimeCard({
            employeeRepository: stubbedEmployeeRepository,
            timeCardRepository: stubbedTimeCardRepository
        });

        stubbedTimeCardRepository.insert.resolves();
    });

    it("should create a time card for the employee", async () => {
        const timeCard = generators.generateTimeCard();
        stubbedEmployeeRepository.fetchById
            .withArgs(timeCard.getEmployeeId())
            .resolves(generators.generateHourlyEmployee());

        await createTimeCard({
            employeeId: timeCard.getEmployeeId(),
            date: timeCard.getDate(),
            hours: timeCard.getHours()
        });

        expect(stubbedTimeCardRepository.insert).to.have.been.calledOnceWithEntity(timeCard);
    });
    it("should throw a EmployeeTypeError if the employee is not hourly", async () => {
        const timeCard = generators.generateTimeCard();
        stubbedEmployeeRepository.fetchById
            .withArgs(timeCard.getEmployeeId())
            .resolves(generators.generateSalariedEmployee());

        const promise = createTimeCard({
            employeeId: timeCard.getEmployeeId(),
            date: timeCard.getDate(),
            hours: timeCard.getHours()
        });

        await expect(promise).to.be.rejectedWith(EmployeeTypeError);
    });
});
