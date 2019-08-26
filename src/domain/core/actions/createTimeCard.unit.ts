import { buildFakeEmployeeRepository, buildFakeTimeCardRepository, Fake } from "../../../../test/fakeBuilders";
import { generateHourlyEmployee, generateSalariedEmployee, generateTimeCard } from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { EmployeeRepository, TimeCardRepository } from "../../core";
import { EmployeeTypeError } from "../errors";
import { buildCreateTimeCardAction, CreateTimeCardAction } from "./createTimeCard";

describe("action createTimeCard", () => {
    let fakeTimeCardRepository: Fake<TimeCardRepository>;
    let fakeEmployeeRepository: Fake<EmployeeRepository>;
    let createTimeCard: CreateTimeCardAction;

    beforeEach(() => {
        fakeTimeCardRepository = buildFakeTimeCardRepository();
        fakeEmployeeRepository = buildFakeEmployeeRepository();
        createTimeCard = buildCreateTimeCardAction({
            employeeRepository: fakeEmployeeRepository,
            timeCardRepository: fakeTimeCardRepository
        });

        fakeTimeCardRepository.insert.resolves();
    });

    it("should create a time card for the employee", async () => {
        const timeCard = generateTimeCard();
        fakeEmployeeRepository.fetchById.withArgs(timeCard.employeeId).resolves(generateHourlyEmployee());

        await createTimeCard(timeCard);

        expect(fakeTimeCardRepository.insert).to.have.been.calledOnceWith(timeCard);
    });
    it("should throw a EmployeeTypeError if the employee is not hourly", async () => {
        const timeCard = generateTimeCard();
        fakeEmployeeRepository.fetchById.withArgs(timeCard.employeeId).resolves(generateSalariedEmployee());

        const promise = createTimeCard(timeCard);

        await expect(promise).to.be.rejectedWith(EmployeeTypeError);
    });
});
