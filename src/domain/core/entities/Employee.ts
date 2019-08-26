export type Employee = HourlyEmployee | SalariedEmployee | CommissionedEmployee;

interface CommonEmployee {
    id: number;
    name: string;
    address: string;
    work: {
        type: EmployeeType;
    };
}

export interface HourlyEmployee extends CommonEmployee {
    work: {
        type: EmployeeType.HOURLY;
        hourlyRate: number;
    };
}

export interface SalariedEmployee extends CommonEmployee {
    work: {
        type: EmployeeType.SALARIED;
        monthlySalary: number;
    };
}

export interface CommissionedEmployee extends CommonEmployee {
    work: {
        type: EmployeeType.COMMISSIONED;
        monthlySalary: number;
        commissionRate: number;
    };
}

export enum EmployeeType {
    HOURLY = "hourly",
    SALARIED = "salaried",
    COMMISSIONED = "commissioned"
}
