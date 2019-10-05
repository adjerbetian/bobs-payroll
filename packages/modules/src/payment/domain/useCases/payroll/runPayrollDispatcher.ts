import * as moment from "moment";
import { PaymentUseCases } from "../PaymentUseCases";

export interface RunPayrollUseCases {
    runHourlyPayroll: (date: string) => Promise<void>;
    runSalariedPayroll: (date: string) => Promise<void>;
    runCommissionedPayroll: (date: string) => Promise<void>;
}

const FRIDAY = 5;

export function makeRunPayrollDispatcher({
    runCommissionedPayroll,
    runHourlyPayroll,
    runSalariedPayroll
}: RunPayrollUseCases): PaymentUseCases["runPayroll"] {
    return async function(date) {
        if (isFriday(date)) {
            await runHourlyPayroll(date);
        }
        if (isLastDayOfMonth(date)) {
            await runSalariedPayroll(date);
            await runCommissionedPayroll(date);
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
