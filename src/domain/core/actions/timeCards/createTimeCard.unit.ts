import { generators, expect, Stub } from "@test/unit";
import { EmployeeTypeError } from "../../errors";
import { EmployeeRepository, TimeCardRepository } from "../../repositories";
import { buildStubbedEmployeeRepository, buildStubbedTimeCardRepository } from "../../test";
import { makeCreateTimeCard } from "./createTimeCard";

describe("action createTimeCard", () => {
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

        await createTimeCard(timeCard);

        expect(stubbedTimeCardRepository.insert).to.have.been.calledOnceWith(timeCard);
    });
    it("should throw a EmployeeTypeError if the employee is not hourly", async () => {
        const timeCard = generators.generateTimeCard();
        stubbedEmployeeRepository.fetchById
            .withArgs(timeCard.getEmployeeId())
            .resolves(generators.generateSalariedEmployee());

        const promise = createTimeCard(timeCard);

        await expect(promise).to.be.rejectedWith(EmployeeTypeError);
    });
});
