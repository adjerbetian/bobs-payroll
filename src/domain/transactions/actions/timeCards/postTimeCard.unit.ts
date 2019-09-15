import { generators, expect, Stub } from "@test/unit";
import * as moment from "moment";
import { CoreActions, TimeCard } from "../../../core";
import { TransactionFormatError } from "../../errors";
import { buildStubbedCoreActions } from "../../test";
import { makePostTimeCardTransaction } from "./postTimeCard";

describe("postTimeCard", () => {
    let stubbedActions: Stub<CoreActions>;
    let postTimeCard: ReturnType<typeof makePostTimeCardTransaction>;

    beforeEach(() => {
        stubbedActions = buildStubbedCoreActions();
        postTimeCard = makePostTimeCardTransaction(stubbedActions);
    });

    it("should create a time card for the employee", async () => {
        const timeCard = generators.generateTimeCard();
        stubbedActions.createTimeCard.resolves();

        await postTimeCardEntity(timeCard);

        expect(stubbedActions.createTimeCard).to.have.been.calledOnceWithEntity(timeCard);
    });
    it("should throw a TransactionFormatError if the date is not in good format", async () => {
        const timeCard = generators.generateTimeCard({ date: moment().format("DD-MM-YYYY") });
        stubbedActions.createTimeCard.resolves();

        const promise = postTimeCardEntity(timeCard);

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "TimeCard");
    });

    async function postTimeCardEntity(timeCard: TimeCard): Promise<void> {
        return postTimeCard(`${timeCard.getEmployeeId()}`, `${timeCard.getDate()}`, `${timeCard.getHours()}`);
    }
});
