import {
    buildStubEmployeeRepository,
    buildStubTimeCardRepository,
    expect,
    generateHourlyEmployee,
    generateSalariedEmployee,
    generateTimeCard,
    Stub
} from "@test/unit";
import { EmployeeTypeError } from "../errors";
import { EmployeeRepository, TimeCardRepository } from "../repositories";
import { buildCreateTimeCard, CreateTimeCard } from "./createTimeCard";

describe("action createTimeCard", () => {
    let stubTimeCardRepository: Stub<TimeCardRepository>;
    let stubEmployeeRepository: Stub<EmployeeRepository>;
    let createTimeCard: CreateTimeCard;

    beforeEach(() => {
        stubTimeCardRepository = buildStubTimeCardRepository();
        stubEmployeeRepository = buildStubEmployeeRepository();
        createTimeCard = buildCreateTimeCard({
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
