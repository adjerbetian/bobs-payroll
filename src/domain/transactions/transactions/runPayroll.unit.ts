import { buildStubActions, expect, Stub } from "@test/unit";
import * as moment from "moment";
import { isoDate } from "../../../utils";
import { Actions } from "../../core";
import { TransactionFormatError } from "../errors";
import { Transaction } from "../Transaction";
import { buildRunPayrollTransaction } from "./runPayroll";

describe("runPayroll", () => {
    let stubActions: Stub<Actions>;
    let runPayroll: Transaction;

    beforeEach(() => {
        stubActions = buildStubActions();
        runPayroll = buildRunPayrollTransaction(stubActions);

        stubActions.runPayroll.resolves();
    });

    it("should call the runPayroll on the date", async () => {
        const date = isoDate();

        await runPayroll(date);

        expect(stubActions.runPayroll).to.have.been.calledOnceWith(date);
    });
    it("should throw a TransactionFormatError if the date is not in good format", async () => {
        const date = moment().format("DD-MM-YYYY");

        const promise = runPayroll(date);

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "Payroll");
    });
});