import {
    buildStubFor,
    expect,
    friday,
    lastDayOfMonth,
    monday,
    saturday,
    Stub,
    sunday,
    thursday,
    tuesday,
    wednesday
} from "@test/unit";
import { RunPayrollAction } from "./RunPayrollAction";
import { buildRunPayrollDispatcher, PayrollActions } from "./runPayrollDispatcher";

describe("action runPayroll", () => {
    let stubPayrollActions: Stub<PayrollActions>;

    let runPayroll: RunPayrollAction;

    beforeEach(() => {
        stubPayrollActions = buildStubPayrollActions();
        runPayroll = buildRunPayrollDispatcher(stubPayrollActions);

        stubPayrollActions.runHourlyPayroll.resolves();
        stubPayrollActions.runSalariedPayroll.resolves();
    });

    it("should should call the runHourlyPayroll only on fridays", async () => {
        await runPayroll(monday);
        await runPayroll(tuesday);
        await runPayroll(wednesday);
        await runPayroll(thursday);
        await runPayroll(friday);
        await runPayroll(saturday);
        await runPayroll(sunday);

        expect(stubPayrollActions.runHourlyPayroll).to.have.been.calledOnceWith(friday);
    });
    it("should should call the runSalariedPayroll only at the end of the month", async () => {
        await runPayroll(lastDayOfMonth);

        expect(stubPayrollActions.runSalariedPayroll).to.have.been.calledOnceWith(lastDayOfMonth);
    });
});

function buildStubPayrollActions(): Stub<PayrollActions> {
    return buildStubFor({
        runHourlyPayroll: true,
        runSalariedPayroll: true
    });
}
