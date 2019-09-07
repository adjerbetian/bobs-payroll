import { CommonEmployee, EmployeeType } from "./common";

export interface SalariedEmployee extends CommonEmployee {
    work: {
        type: EmployeeType.SALARIED;
        monthlySalary: number;
    };
}
