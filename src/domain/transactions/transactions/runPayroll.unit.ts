import * as moment from "moment";
import { buildFakeActions, Fake } from "../../../../test/fakeBuilders";
import { expect } from "../../../../test/unitTest";
import { isoDate } from "../../../../test/utils";
import { Actions } from "../../core";
import { TransactionFormatError } from "../errors";
import { Transaction } from "../Transaction";
import { buildRunPayrollTransaction } from "./runPayroll";

describe("runPayroll", () => {
    let fakeActions: Fake<Actions>;
    let runPayroll: Transaction;

    beforeEach(() => {
        fakeActions = buildFakeActions();
        runPayroll = buildRunPayrollTransaction(fakeActions);

        fakeActions.runPayroll.resolves();
    });

    it("should call the runPayroll on the date", async () => {
        const date = isoDate();

        await runPayroll(date);

        expect(fakeActions.runPayroll).to.have.been.calledOnceWith(date);
    });
    it("should throw a TransactionFormatError if the date is not in good format", async () => {
        const date = moment().format("DD-MM-YYYY");

        const promise = runPayroll(date);

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "Payroll");
    });
});
