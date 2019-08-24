import { Employee, EmployeeType, SalesReceipt, ServiceCharge, TimeCard } from "../src";
import * as _ from "lodash";
import { generateIndex } from "./utils";
import * as moment from "moment";

type PEmployee = Partial<Employee>;

export function generateUnionEmployee(args: PEmployee = {}): Employee {
    const index = generateIndex();
    return generateHourlyEmployee({
        memberId: `member-${index}`,
        ...args
    });
}

export function generateHourlyEmployee(args: PEmployee = {}): Employee {
    return generateEmployee({
        type: EmployeeType.HOURLY,
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
        hourlyRate: null,
        monthlySalary: null,
        commissionRate: null,
        memberId: null,
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

export function generateServiceCharge(args: Partial<ServiceCharge> = {}): ServiceCharge {
    const index = generateIndex();
    return {
        memberId: `member-${index}`,
        amount: generateFloatBetween(2, 10),
        ...args
    };
}

function generateFloatBetween(min: number, max: number): number {
    return _.round(_.random(min, max, true), 2);
}
