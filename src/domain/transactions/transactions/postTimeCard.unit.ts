import { buildStubCoreActions, expect, generateTimeCard, Stub } from "@test/unit";
import * as moment from "moment";
import { CoreActions, TimeCard } from "../../core";
import { TransactionFormatError } from "../errors";
import { Transaction } from "../Transaction";
import { buildPostTimeCardTransaction } from "./postTimeCard";

describe("postTimeCard", () => {
    let stubActions: Stub<CoreActions>;
    let postTimeCard: Transaction;

    beforeEach(() => {
        stubActions = buildStubCoreActions();
        postTimeCard = buildPostTimeCardTransaction(stubActions);
    });

    it("should create a time card for the employee", async () => {
        const timeCard = generateTimeCard();
        stubActions.createTimeCard.resolves();

        await postTimeCardEntity(timeCard);

        expect(stubActions.createTimeCard).to.have.been.calledOnceWith(timeCard);
    });
    it("should throw a TransactionFormatError if the date is not in good format", async () => {
        const timeCard = generateTimeCard({ date: moment().format("DD-MM-YYYY") });
        stubActions.createTimeCard.resolves();

        const promise = postTimeCardEntity(timeCard);

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "TimeCard");
    });

    async function postTimeCardEntity(timeCard: TimeCard): Promise<void> {
        return postTimeCard(`${timeCard.employeeId}`, `${timeCard.date}`, `${timeCard.hours}`);
    }
});
