import { Employee, TimeCard } from "../src/entities";
import * as _ from "lodash";
import { generateIndex } from "./utils";
import * as moment from "moment";

export function generateHourlyRateEmployee(): Employee {
    return generateEmployee({
        type: "hourly-rate",
        hourlyRate: generateFloatBetween(0, 10)
    });
}

export function generateMonthlySalaryEmployee(overridingParams: Partial<Employee> = {}): Employee {
    return generateEmployee({
        type: "monthly-salary",
        monthlySalary: generateFloatBetween(10, 20),
        ...overridingParams
    });
}

function generateEmployee(overridingFields: Partial<Employee> = {}): Employee {
    const index = generateIndex();
    return {
        id: index,
        name: `name of employee ${index}`,
        address: `address of employee ${index}`,
        type: "unknown",
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

function generateFloatBetween(min: number, max: number): number {
    return _.round(_.random(min, max, true), 2);
}
