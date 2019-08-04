import { Employee } from "../src/entities";
import * as _ from "lodash";
import { generateIndex } from "./utils";

export function generateHourlyRateEmployee(): Employee {
    return generateEmployee({
        type: "hourly-rate",
        hourlyRate: generateFloatBetween(0, 10)
    });
}

export function generateMonthlySalaryEmployee(): Employee {
    return generateEmployee({
        type: "monthly-salary",
        salary: generateFloatBetween(10, 20)
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

function generateFloatBetween(min: number, max: number): number {
    return _.round(_.random(min, max, true), 2);
}
