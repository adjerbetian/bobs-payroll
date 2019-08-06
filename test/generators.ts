import { Employee, SalesReceipt, TimeCard } from "../src/entities";
import * as _ from "lodash";
import { generateIndex } from "./utils";
import * as moment from "moment";
import { EmployeeType } from "../src/entities/Employee";

type PEmployee = Partial<Employee>;

export function generateHourlyRateEmployee(args: PEmployee = {}): Employee {
    return generateEmployee({
        type: EmployeeType.HOURLY_RATE,
        hourlyRate: generateFloatBetween(0, 10),
        ...args
    });
}

export function generateMonthlySalaryEmployee(args: PEmployee = {}): Employee {
    return generateEmployee({
        type: EmployeeType.MONTHLY_SALARY,
        monthlySalary: generateFloatBetween(10, 20),
        ...args
    });
}

export function generateCommissionedSalaryEmployee(args: PEmployee = {}): Employee {
    return generateEmployee({
        type: EmployeeType.COMMISSIONED,
        monthlySalary: generateFloatBetween(10, 20),
        commissionRate: generateFloatBetween(20, 30),
        ...args
    });
}

function generateEmployee(args: PEmployee & { type: EmployeeType }): Employee {
    const index = generateIndex();
    return {
        id: index,
        name: `name of employee ${index}`,
        address: `address of employee ${index}`,
        ...args
    };
}

export function generateTimeCard(args: Partial<TimeCard> = {}): TimeCard {
    const index = generateIndex();
    return {
        employeeId: index,
        date: moment().format("YYYY-MM-DD"),
        hours: generateFloatBetween(2, 10),
        ...args
    };
}

export function generateSalesReceipt(args: Partial<SalesReceipt> = {}): SalesReceipt {
    const index = generateIndex();
    return {
        employeeId: index,
        date: moment().format("YYYY-MM-DD"),
        amount: generateFloatBetween(2, 10),
        ...args
    };
}

function generateFloatBetween(min: number, max: number): number {
    return _.round(_.random(min, max, true), 2);
}
