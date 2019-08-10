import * as moment from "moment";
import {
    buildFakeEmployeeRepository,
    buildFakeTimeCardRepository,
    Fake
} from "../../../test/fakeBuilders";
import {
    generateHourlyRateEmployee,
    generateMonthlySalaryEmployee,
    generateTimeCard
} from "../../../test/generators";
import { expect } from "../../../test/unitTest";
import { TimeCard } from "../entities";
import { EmployeeTypeError, TransactionFormatError } from "../errors";
import { EmployeeRepository, TimeCardRepository } from "../repositories";
import { buildPostTimeCardTransaction } from "./postTimeCard";
import { Transaction } from "./Transactions";

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
        fakeEmployeeRepository.fetchById
            .withArgs(timeCard.employeeId)
            .resolves(generateHourlyRateEmployee());

        await postTimeCardEntity(timeCard);

        expect(fakeTimeCardRepository.insertOne).to.have.been.calledOnceWith(timeCard);
    });
    it("should throw a EmployeeTypeError if the employee is not in hourly rate", async () => {
        const timeCard = generateTimeCard();
        fakeEmployeeRepository.fetchById
            .withArgs(timeCard.employeeId)
            .resolves(generateMonthlySalaryEmployee());

        // noinspection ES6MissingAwait
        const promise = postTimeCardEntity(timeCard);

        await expect(promise).to.be.rejectedWith(EmployeeTypeError);
    });
    it("should throw a TransactionFormatError if the date is not in good format", async () => {
        const timeCard = generateTimeCard({ date: moment().format("DD-MM-YYYY") });
        fakeEmployeeRepository.fetchById
            .withArgs(timeCard.employeeId)
            .resolves(generateHourlyRateEmployee());

        // noinspection ES6MissingAwait
        const promise = postTimeCardEntity(timeCard);

        await expect(promise).to.be.rejectedWith(TransactionFormatError);
    });

    async function postTimeCardEntity(timeCard: TimeCard): Promise<void> {
        return postTimeCard(`${timeCard.employeeId}`, `${timeCard.date}`, `${timeCard.hours}`);
    }
});
