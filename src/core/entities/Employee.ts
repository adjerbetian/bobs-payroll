export interface Employee {
    id: number;
    name: string;
    address: string;
    type: EmployeeType;
    hourlyRate?: number;
    monthlySalary?: number;
    commissionRate?: number | null;
    union?: boolean;
}

export enum EmployeeType {
    HOURLY_RATE = "hourly-rate",
    MONTHLY_SALARY = "monthly-salary",
    COMMISSIONED = "commissioned"
}
