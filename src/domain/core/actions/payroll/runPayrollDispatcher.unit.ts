import { friday, monday, saturday, sunday, thursday, tuesday, wednesday } from "../../../../../test/dates";
import { buildStubFor, Stub } from "../../../../../test/stubBuilders";
import { expect } from "../../../../../test/unitTest";
import { RunPayrollAction } from "./RunPayrollAction";
import { buildRunPayrollDispatcher, PayrollActions } from "./runPayrollDispatcher";

describe("action runPayroll", () => {
    let stubPayrollActions: Stub<PayrollActions>;

    let runPayroll: RunPayrollAction;

    beforeEach(() => {
        stubPayrollActions = buildStubPayrollActions();
        runPayroll = buildRunPayrollDispatcher(stubPayrollActions);
    });

    it("should should call the runHourlyPayroll only on fridays", async () => {
        stubPayrollActions.runHourlyPayroll.resolves();

        await runPayroll(monday);
        await runPayroll(tuesday);
        await runPayroll(wednesday);
        await runPayroll(thursday);
        await runPayroll(friday);
        await runPayroll(saturday);
        await runPayroll(sunday);

        expect(stubPayrollActions.runHourlyPayroll).to.have.been.calledOnceWith(friday);
    });
});

function buildStubPayrollActions(): Stub<PayrollActions> {
    return buildStubFor({
        runHourlyPayroll: true
    });
}
