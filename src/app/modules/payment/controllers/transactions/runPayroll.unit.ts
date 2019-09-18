import { expect, Stub } from "@test/unit";
import * as moment from "moment";
import { isoDate } from "../../../../../utils";
import { RouteFormatError } from "../../../../router";
import { PaymentActions } from "../../domain";
import { buildStubbedPaymentActions } from "../test";
import { makeRunPayrollController } from "./runPayroll";

describe("runPayroll", () => {
    let stubbedActions: Stub<PaymentActions>;
    let runPayroll: ReturnType<typeof makeRunPayrollController>;

    beforeEach(() => {
        stubbedActions = buildStubbedPaymentActions();
        runPayroll = makeRunPayrollController(stubbedActions);

        stubbedActions.runPayroll.resolves();
    });

    it("should call the runPayroll on the date", async () => {
        const date = isoDate();

        await runPayroll(date);

        expect(stubbedActions.runPayroll).to.have.been.calledOnceWith(date);
    });
    it("should throw a RouteFormatError if the date is not in good format", async () => {
        const date = moment().format("DD-MM-YYYY");

        const promise = runPayroll(date);

        await expect(promise).to.be.rejectedWith(RouteFormatError, "Payday");
    });
});
