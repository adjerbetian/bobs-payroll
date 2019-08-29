import * as moment from "moment";

export type RunPayrollAction = (date: string) => Promise<void>;

export interface PayrollActions {
    runHourlyPayroll: (date: string) => Promise<void>;
}

const FRIDAY = 5;

export function buildRunPayrollAction(payrollActions: PayrollActions): RunPayrollAction {
    return async function(date: string): Promise<void> {
        if (moment(date).day() === FRIDAY) {
            await payrollActions.runHourlyPayroll(date);
        }
    };
}
