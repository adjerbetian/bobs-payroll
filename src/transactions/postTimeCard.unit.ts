import { expect } from "../../test/unitTest";
import { generateTimeCard } from "../../test/generators";
import { Transaction } from "./Transactions";
import { buildPostTimeCardTransaction } from "./postTimeCard";
import { buildFakeTimeCardRepository, FakeTimeCardRepository } from "../../test/fakeBuilders";

describe("postTimeCard", () => {
    let fakeTimeCardRepository: FakeTimeCardRepository;
    let postTimeCard: Transaction;

    beforeEach(() => {
        fakeTimeCardRepository = buildFakeTimeCardRepository();
        postTimeCard = buildPostTimeCardTransaction(fakeTimeCardRepository);

        fakeTimeCardRepository.insertOne.resolves();
    });

    it("should create a time card for the employee", async () => {
        const timeCard = generateTimeCard();

        await postTimeCard(`${timeCard.employeeId}`, `${timeCard.date}`, `${timeCard.hours}`);

        expect(fakeTimeCardRepository.insertOne).to.have.been.calledOnceWith(timeCard);
    });
});
