import * as moment from "moment";
import { buildFakeActions, Fake } from "../../../../test/fakeBuilders";
import { generateTimeCard } from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { Actions, TimeCard } from "../../core";
import { TransactionFormatError } from "../errors";
import { Transaction } from "../Transaction";
import { buildPostTimeCardTransaction } from "./postTimeCard";

describe("postTimeCard", () => {
    let fakeActions: Fake<Actions>;
    let postTimeCard: Transaction;

    beforeEach(() => {
        fakeActions = buildFakeActions();
        postTimeCard = buildPostTimeCardTransaction(fakeActions);
    });

    it("should create a time card for the employee", async () => {
        const timeCard = generateTimeCard();
        fakeActions.createTimeCard.resolves();

        await postTimeCardEntity(timeCard);

        expect(fakeActions.createTimeCard).to.have.been.calledOnceWith(timeCard);
    });
    it("should throw a TransactionFormatError if the date is not in good format", async () => {
        const timeCard = generateTimeCard({ date: moment().format("DD-MM-YYYY") });
        fakeActions.createTimeCard.resolves();

        const promise = postTimeCardEntity(timeCard);

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "TimeCard");
    });

    async function postTimeCardEntity(timeCard: TimeCard): Promise<void> {
        return postTimeCard(`${timeCard.employeeId}`, `${timeCard.date}`, `${timeCard.hours}`);
    }
});
