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
        if (isLastDayOfMonth(date)) {
            await payrollActions.runSalariedPayroll(date);
        }
    };

    function isFriday(date: string): boolean {
        return moment(date).day() === FRIDAY;
    }
    function isLastDayOfMonth(date: string): boolean {
        const lastDayOfMonth = moment(date).endOf("month");
        return moment(date).isSame(lastDayOfMonth, "day");
    }
}
