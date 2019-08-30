import { friday, monday, saturday, sunday, thursday, tuesday, wednesday } from "../../../../../test/dates";
import { buildStubFor, Fake } from "../../../../../test/fakeBuilders";
import { expect } from "../../../../../test/unitTest";
import { RunPayrollAction } from "./RunPayrollAction";
import { buildRunPayrollDispatcher, PayrollActions } from "./runPayrollDispatcher";

describe("action runPayroll", () => {
    let fakePayrollActions: Fake<PayrollActions>;

    let runPayroll: RunPayrollAction;

    beforeEach(() => {
        fakePayrollActions = buildFakePayrollActions();
        runPayroll = buildRunPayrollDispatcher(fakePayrollActions);
    });

    it("should should call the runHourlyPayroll only on fridays", async () => {
        fakePayrollActions.runHourlyPayroll.resolves();

        await runPayroll(monday);
        await runPayroll(tuesday);
        await runPayroll(wednesday);
        await runPayroll(thursday);
        await runPayroll(friday);
        await runPayroll(saturday);
        await runPayroll(sunday);

        expect(fakePayrollActions.runHourlyPayroll).to.have.been.calledOnceWith(friday);
    });
});

function buildFakePayrollActions(): Fake<PayrollActions> {
    return {
        runHourlyPayroll: buildStubFor("runHourlyPayroll")
    };
}
