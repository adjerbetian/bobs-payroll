import { friday, monday, saturday, sunday, thursday, tuesday, wednesday } from "../../../../test/dates";
import { buildStubFor, Fake } from "../../../../test/fakeBuilders";
import { expect } from "../../../../test/unitTest";
import { buildRunPayrollAction, PayrollActions, RunPayrollAction } from "./runPayroll";

describe("action runPayroll", () => {
    let fakePayrollActions: Fake<PayrollActions>;

    let runPayroll: RunPayrollAction;

    beforeEach(() => {
        fakePayrollActions = buildFakePayrollActions();
        runPayroll = buildRunPayrollAction(fakePayrollActions);
    });

    it("should should call the runHourlyPayroll only on fridays", async () => {
        await runPayroll(`Payroll ${monday}`);
        await runPayroll(`Payroll ${tuesday}`);
        await runPayroll(`Payroll ${wednesday}`);
        await runPayroll(`Payroll ${thursday}`);
        await runPayroll(`Payroll ${friday}`);
        await runPayroll(`Payroll ${saturday}`);
        await runPayroll(`Payroll ${sunday}`);

        expect(fakePayrollActions.runHourlyPayroll).to.have.been.calledOnceWith(friday);
    });
});

function buildFakePayrollActions(): Fake<PayrollActions> {
    return {
        runHourlyPayroll: buildStubFor("runHourlyPayroll")
    };
}
