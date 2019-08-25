import * as moment from "moment";
import { buildFakeEmployeeRepository, buildFakeTimeCardRepository, Fake } from "../../../../test/fakeBuilders";
import { generateHourlyEmployee, generateSalariedEmployee, generateTimeCard } from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { EmployeeRepository, TimeCard, TimeCardRepository } from "../../core";
import { EmployeeTypeError, TransactionFormatError } from "../errors";
import { buildPostTimeCardTransaction } from "./postTimeCard";
import { Transaction } from "../Transaction";

describe("postTimeCard", () => {
    let fakeTimeCardRepository: Fake<TimeCardRepository>;
    let fakeEmployeeRepository: Fake<EmployeeRepository>;
    let postTimeCard: Transaction;

    beforeEach(() => {
        fakeTimeCardRepository = buildFakeTimeCardRepository();
        fakeEmployeeRepository = buildFakeEmployeeRepository();
        postTimeCard = buildPostTimeCardTransaction({
            employeeRepository: fakeEmployeeRepository,
            timeCardRepository: fakeTimeCardRepository
        });

        fakeTimeCardRepository.insertOne.resolves();
    });

    it("should create a time card for the employee", async () => {
        const timeCard = generateTimeCard();
        fakeEmployeeRepository.fetchById.withArgs(timeCard.employeeId).resolves(generateHourlyEmployee());

        await postTimeCardEntity(timeCard);

        expect(fakeTimeCardRepository.insertOne).to.have.been.calledOnceWith(timeCard);
    });
    it("should throw a EmployeeTypeError if the employee is not hourly", async () => {
        const timeCard = generateTimeCard();
        fakeEmployeeRepository.fetchById.withArgs(timeCard.employeeId).resolves(generateSalariedEmployee());

        const promise = postTimeCardEntity(timeCard);

        await expect(promise).to.be.rejectedWith(EmployeeTypeError);
    });
    it("should throw a TransactionFormatError if the date is not in good format", async () => {
        const timeCard = generateTimeCard({ date: moment().format("DD-MM-YYYY") });
        fakeEmployeeRepository.fetchById.withArgs(timeCard.employeeId).resolves(generateHourlyEmployee());

        const promise = postTimeCardEntity(timeCard);

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "TimeCard");
    });

    async function postTimeCardEntity(timeCard: TimeCard): Promise<void> {
        return postTimeCard(`${timeCard.employeeId}`, `${timeCard.date}`, `${timeCard.hours}`);
    }
});
