import {
    buildStubFor,
    expect,
    firstDayOfMonth,
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
import { makeRunPayrollDispatcher, RunPayrollActions } from "./runPayrollDispatcher";

describe("action runPayroll", () => {
    let stubbedPayrollActions: Stub<RunPayrollActions>;

    let runPayroll: ReturnType<typeof makeRunPayrollDispatcher>;

    beforeEach(() => {
        stubbedPayrollActions = buildStubPayrollActions();
        runPayroll = makeRunPayrollDispatcher(stubbedPayrollActions);

        stubbedPayrollActions.runHourlyPayroll.resolves();
        stubbedPayrollActions.runSalariedPayroll.resolves();
        stubbedPayrollActions.runCommissionedPayroll.resolves();
    });

    it("should should call the runHourlyPayroll only on fridays", async () => {
        await runPayroll(monday);
        await runPayroll(tuesday);
        await runPayroll(wednesday);
        await runPayroll(thursday);
        await runPayroll(friday);
        await runPayroll(saturday);
        await runPayroll(sunday);

        expect(stubbedPayrollActions.runHourlyPayroll).to.have.been.calledOnceWith(friday);
    });
    it("should should call the runSalariedPayroll only at the end of the month", async () => {
        await runPayroll(firstDayOfMonth);
        await runPayroll(lastDayOfMonth);

        expect(stubbedPayrollActions.runSalariedPayroll).to.have.been.calledOnceWith(lastDayOfMonth);
    });
    it("should should call the runCommissionedPayroll only at the end of the month", async () => {
        await runPayroll(firstDayOfMonth);
        await runPayroll(lastDayOfMonth);

        expect(stubbedPayrollActions.runCommissionedPayroll).to.have.been.calledOnceWith(lastDayOfMonth);
    });
});

function buildStubPayrollActions(): Stub<RunPayrollActions> {
    return buildStubFor({
        runHourlyPayroll: true,
        runSalariedPayroll: true,
        runCommissionedPayroll: true
    });
}
