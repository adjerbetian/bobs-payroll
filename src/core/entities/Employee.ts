export interface Employee {
    id: number;
    name: string;
    address: string;
    type: EmployeeType;
    hourlyRate: number | null;
    monthlySalary: number | null;
    commissionRate: number | null;
    memberId: string | null;
}

export enum EmployeeType {
    HOURLY = "hourly",
    MONTHLY_SALARY = "monthly-salary",
    COMMISSIONED = "commissioned"
}
