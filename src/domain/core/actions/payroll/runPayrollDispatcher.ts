import * as moment from "moment";
import { RunPayrollAction } from "./RunPayrollAction";

export interface PayrollActions {
    runHourlyPayroll: (date: string) => Promise<void>;
}

const FRIDAY = 5;

export function buildRunPayrollDispatcher(payrollActions: PayrollActions): RunPayrollAction {
    return async function(date: string): Promise<void> {
        if (moment(date).day() === FRIDAY) {
            await payrollActions.runHourlyPayroll(date);
        }
    };
}
