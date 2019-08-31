import * as moment from "moment";
import { RunPayrollAction } from "./RunPayrollAction";

export interface PayrollActions {
    runHourlyPayroll: (date: string) => Promise<void>;
    runSalariedPayroll: (date: string) => Promise<void>;
}

const FRIDAY = 5;

export function buildRunPayrollDispatcher(payrollActions: PayrollActions): RunPayrollAction {
    return async function(date: string): Promise<void> {
        if (isFriday(date)) {
            await payrollActions.runHourlyPayroll(date);
        }
        await payrollActions.runSalariedPayroll(date);
    };

    function isFriday(date: string): boolean {
        return moment(date).day() === FRIDAY;
    }
}
