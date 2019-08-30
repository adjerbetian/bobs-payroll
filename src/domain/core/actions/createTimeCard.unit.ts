import { buildStubEmployeeRepository, buildStubTimeCardRepository, Stub } from "../../../../test/stubBuilders";
import { generateHourlyEmployee, generateSalariedEmployee, generateTimeCard } from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { EmployeeRepository, TimeCardRepository } from "../../core";
import { EmployeeTypeError } from "../errors";
import { buildCreateTimeCardAction, CreateTimeCardAction } from "./createTimeCard";

describe("action createTimeCard", () => {
    let stubTimeCardRepository: Stub<TimeCardRepository>;
    let stubEmployeeRepository: Stub<EmployeeRepository>;
    let createTimeCard: CreateTimeCardAction;

    beforeEach(() => {
        stubTimeCardRepository = buildStubTimeCardRepository();
        stubEmployeeRepository = buildStubEmployeeRepository();
        createTimeCard = buildCreateTimeCardAction({
            employeeRepository: stubEmployeeRepository,
            timeCardRepository: stubTimeCardRepository
        });

        stubTimeCardRepository.insert.resolves();
    });

    it("should create a time card for the employee", async () => {
        const timeCard = generateTimeCard();
        stubEmployeeRepository.fetchById.withArgs(timeCard.employeeId).resolves(generateHourlyEmployee());

        await createTimeCard(timeCard);

        expect(stubTimeCardRepository.insert).to.have.been.calledOnceWith(timeCard);
    });
    it("should throw a EmployeeTypeError if the employee is not hourly", async () => {
        const timeCard = generateTimeCard();
        stubEmployeeRepository.fetchById.withArgs(timeCard.employeeId).resolves(generateSalariedEmployee());

        const promise = createTimeCard(timeCard);

        await expect(promise).to.be.rejectedWith(EmployeeTypeError);
    });
});
