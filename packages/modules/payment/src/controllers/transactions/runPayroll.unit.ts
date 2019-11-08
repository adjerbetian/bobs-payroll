import { µ } from "@payroll/common";
import { expect, Stub } from "@infra/test";
import * as moment from "moment";
import { PaymentUseCases } from "../../domain";
import { RouteFormatError } from "../errors";
import { buildStubbedPaymentUseCases } from "../test";
import { makeRunPayrollController } from "./runPayroll";

describe("runPayroll", () => {
    let stubbedUseCases: Stub<PaymentUseCases>;
    let runPayroll: ReturnType<typeof makeRunPayrollController>;

    beforeEach(() => {
        stubbedUseCases = buildStubbedPaymentUseCases();
        runPayroll = makeRunPayrollController(stubbedUseCases);

        stubbedUseCases.runPayroll.resolves();
    });

    it("should call the runPayroll on the date", async () => {
        const date = µ.isoDate();

        await runPayroll(date);

        expect(stubbedUseCases.runPayroll).to.have.been.calledOnceWith(date);
    });
    it("should throw a RouteFormatError if the date is not in good format", async () => {
        const date = moment().format("DD-MM-YYYY");

        const promise = runPayroll(date);

        await expect(promise).to.be.rejectedWith(RouteFormatError, "Payday");
    });
});
