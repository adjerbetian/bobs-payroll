import { CommonEmployee, EmployeeType } from "./common";

export interface HourlyEmployee extends CommonEmployee {
    work: {
        type: EmployeeType.HOURLY;
        hourlyRate: number;
    };
}
