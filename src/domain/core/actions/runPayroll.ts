export type RunPayrollAction = (date: string) => Promise<void>;

export interface PayrollActions {
    runHourlyPayroll: (date: string) => Promise<void>;
}

export function buildRunPayrollAction(payrollActions: PayrollActions): RunPayrollAction {
    return async function(date: string): Promise<void> {
        throw new Error("todo");
    };
}
