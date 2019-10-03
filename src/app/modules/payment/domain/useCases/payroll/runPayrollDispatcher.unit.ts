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
import { makeRunPayrollDispatcher, RunPayrollUseCases } from "./runPayrollDispatcher";

describe("use case - runPayroll", () => {
    let stubbedPayrollUseCases: Stub<RunPayrollUseCases>;

    let runPayroll: ReturnType<typeof makeRunPayrollDispatcher>;

    beforeEach(() => {
        stubbedPayrollUseCases = buildStubPayrollUseCases();
        runPayroll = makeRunPayrollDispatcher(stubbedPayrollUseCases);

        stubbedPayrollUseCases.runHourlyPayroll.resolves();
        stubbedPayrollUseCases.runSalariedPayroll.resolves();
        stubbedPayrollUseCases.runCommissionedPayroll.resolves();
    });

    it("should should call the runHourlyPayroll only on fridays", async () => {
        await runPayroll(monday);
        await runPayroll(tuesday);
        await runPayroll(wednesday);
        await runPayroll(thursday);
        await runPayroll(friday);
        await runPayroll(saturday);
        await runPayroll(sunday);

        expect(stubbedPayrollUseCases.runHourlyPayroll).to.have.been.calledOnceWith(friday);
    });
    it("should should call the runSalariedPayroll only at the end of the month", async () => {
        await runPayroll(firstDayOfMonth);
        await runPayroll(lastDayOfMonth);

        expect(stubbedPayrollUseCases.runSalariedPayroll).to.have.been.calledOnceWith(lastDayOfMonth);
    });
    it("should should call the runCommissionedPayroll only at the end of the month", async () => {
        await runPayroll(firstDayOfMonth);
        await runPayroll(lastDayOfMonth);

        expect(stubbedPayrollUseCases.runCommissionedPayroll).to.have.been.calledOnceWith(lastDayOfMonth);
    });
});

function buildStubPayrollUseCases(): Stub<RunPayrollUseCases> {
    return buildStubFor({
        runHourlyPayroll: true,
        runSalariedPayroll: true,
        runCommissionedPayroll: true
    });
}
