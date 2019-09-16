import { expect, Stub } from "@test/unit";
import * as moment from "moment";
import { isoDate } from "../../../../utils";
import { PaymentActions } from "../../../payment";
import { TransactionFormatError } from "../../errors";
import { buildStubbedPaymentActions } from "../../test";
import { makeRunPayrollTransaction } from "./runPayroll";

describe("runPayroll", () => {
    let stubbedActions: Stub<PaymentActions>;
    let runPayroll: ReturnType<typeof makeRunPayrollTransaction>;

    beforeEach(() => {
        stubbedActions = buildStubbedPaymentActions();
        runPayroll = makeRunPayrollTransaction(stubbedActions);

        stubbedActions.runPayroll.resolves();
    });

    it("should call the runPayroll on the date", async () => {
        const date = isoDate();

        await runPayroll(date);

        expect(stubbedActions.runPayroll).to.have.been.calledOnceWith(date);
    });
    it("should throw a TransactionFormatError if the date is not in good format", async () => {
        const date = moment().format("DD-MM-YYYY");

        const promise = runPayroll(date);

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "Payday");
    });
});
