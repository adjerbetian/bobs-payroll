import { Employee, SalesReceipt, TimeCard } from "../src/entities";
import * as _ from "lodash";
import { generateIndex } from "./utils";
import * as moment from "moment";
import { EmployeeType } from "../src/entities/Employee";

export function generateHourlyRateEmployee(): Employee {
    return generateEmployee({
        type: EmployeeType.HOURLY_RATE,
        hourlyRate: generateFloatBetween(0, 10)
    });
}

export function generateMonthlySalaryEmployee(overridingParams: Partial<Employee> = {}): Employee {
    return generateEmployee({
        type: EmployeeType.MONTHLY_SALARY,
        monthlySalary: generateFloatBetween(10, 20),
        ...overridingParams
    });
}

export function generateCommissionedSalaryEmployee(
    overridingParams: Partial<Employee> = {}
): Employee {
    return generateEmployee({
        type: EmployeeType.COMMISSIONED,
        monthlySalary: generateFloatBetween(10, 20),
        commissionRate: generateFloatBetween(20, 30),
        ...overridingParams
    });
}

function generateEmployee(overridingFields: Partial<Employee> & { type: EmployeeType }): Employee {
    const index = generateIndex();
    return {
        id: index,
        name: `name of employee ${index}`,
        address: `address of employee ${index}`,
        ...overridingFields
    };
}

export function generateTimeCard(overridingParams: Partial<TimeCard> = {}): TimeCard {
    const index = generateIndex();
    return {
        employeeId: index,
        date: moment().format("YYYY-MM-DD"),
        hours: generateFloatBetween(2, 10),
        ...overridingParams
    };
}

export function generateSalesReceipt(overridingParams: Partial<SalesReceipt> = {}): SalesReceipt {
    const index = generateIndex();
    return {
        employeeId: index,
        date: moment().format("YYYY-MM-DD"),
        amount: generateFloatBetween(2, 10),
        ...overridingParams
    };
}

function generateFloatBetween(min: number, max: number): number {
    return _.round(_.random(min, max, true), 2);
}
