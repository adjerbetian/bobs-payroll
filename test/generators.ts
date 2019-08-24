import * as _ from "lodash";
import * as moment from "moment";
import {
    CommissionedEmployee,
    Employee,
    EmployeeType,
    HourlyEmployee,
    SalariedEmployee,
    SalesReceipt,
    ServiceCharge,
    TimeCard
} from "../src";
import { generateIndex } from "./utils";

export function generateUnionEmployee(args: Partial<HourlyEmployee> = {}): HourlyEmployee {
    const index = generateIndex();
    return {
        ...generateHourlyEmployee(),
        memberId: `member-${index}`,
        ...args
    };
}

export function generateHourlyEmployee(args: Partial<HourlyEmployee> = {}): HourlyEmployee {
    return {
        ...generateEmployee(),
        type: EmployeeType.HOURLY,
        hourlyRate: generateFloatBetween(0, 10),
        ...args
    };
}

export function generateSalariedEmployee(args: Partial<SalariedEmployee> = {}): SalariedEmployee {
    return {
        ...generateEmployee(),
        type: EmployeeType.SALARIED,
        monthlySalary: generateFloatBetween(10, 20),
        ...args
    };
}

export function generateCommissionedEmployee(args: Partial<CommissionedEmployee> = {}): CommissionedEmployee {
    return {
        ...generateEmployee(),
        type: EmployeeType.COMMISSIONED,
        monthlySalary: generateFloatBetween(10, 20),
        commissionRate: generateFloatBetween(20, 30),
        ...args
    };
}

function generateEmployee(): Omit<Employee, "type"> {
    const index = generateIndex();
    return {
        id: index,
        name: `name of employee ${index}`,
        address: `address of employee ${index}`,
        memberId: null
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
