import { buildStubbedCoreActions, expect, generateTimeCard, Stub } from "@test/unit";
import * as moment from "moment";
import { CoreActions, TimeCard } from "../../../core";
import { TransactionFormatError } from "../../errors";
import { buildPostTimeCardTransaction } from "./postTimeCard";

describe("postTimeCard", () => {
    let stubbedActions: Stub<CoreActions>;
    let postTimeCard: ReturnType<typeof buildPostTimeCardTransaction>;

    beforeEach(() => {
        stubbedActions = buildStubbedCoreActions();
        postTimeCard = buildPostTimeCardTransaction(stubbedActions);
    });

    it("should create a time card for the employee", async () => {
        const timeCard = generateTimeCard();
        stubbedActions.createTimeCard.resolves();

        await postTimeCardEntity(timeCard);

        expect(stubbedActions.createTimeCard).to.have.been.calledOnceWith(timeCard);
    });
    it("should throw a TransactionFormatError if the date is not in good format", async () => {
        const timeCard = generateTimeCard({ date: moment().format("DD-MM-YYYY") });
        stubbedActions.createTimeCard.resolves();

        const promise = postTimeCardEntity(timeCard);

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "TimeCard");
    });

    async function postTimeCardEntity(timeCard: TimeCard): Promise<void> {
        return postTimeCard(`${timeCard.employeeId}`, `${timeCard.date}`, `${timeCard.hours}`);
    }
});
