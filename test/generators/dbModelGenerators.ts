import * as moment from "moment";
import {
    CommissionedEmployeeDBModel,
    EmployeeType,
    HourlyEmployeeDBModel,
    SalariedEmployeeDBModel,
    TimeCardDBModel,
    UnionMemberDBModel
} from "../../src";
import { generateFloatBetween, generateIndex } from "./common";

export const dbModelGenerators = {
    generateTimeCard(args: Partial<TimeCardDBModel> = {}): TimeCardDBModel {
        const index = generateIndex();
        return {
            employeeId: index,
            date: moment().format("YYYY-MM-DD"),
            hours: generateFloatBetween(2, 8),
            ...args
        };
    },
    generateUnionMember(args: Partial<UnionMemberDBModel> = {}): UnionMemberDBModel {
        return {
            employeeId: generateIndex(),
            memberId: `member-${generateIndex()}`,
            rate: generateFloatBetween(0, 0.1),
            ...args
        };
    },
    generateHourlyEmployee(args: Partial<HourlyEmployeeDBModel> = {}): HourlyEmployeeDBModel {
        const index = generateIndex();
        return {
            id: index,
            address: `address-${index}`,
            name: `name-${index}`,
            hourlyRate: generateFloatBetween(10, 20),
            type: EmployeeType.HOURLY,
            ...args
        };
    },
    generateSalariedEmployee(args: Partial<SalariedEmployeeDBModel> = {}): SalariedEmployeeDBModel {
        const index = generateIndex();
        return {
            id: index,
            address: `address-${index}`,
            name: `name-${index}`,
            salary: generateFloatBetween(1500, 5000),
            type: EmployeeType.SALARIED,
            ...args
        };
    },
    generateCommissionedEmployee(args: Partial<CommissionedEmployeeDBModel> = {}): CommissionedEmployeeDBModel {
        const index = generateIndex();
        return {
            id: index,
            address: `address-${index}`,
            name: `name-${index}`,
            salary: generateFloatBetween(1500, 5000),
            commissionRate: generateFloatBetween(0, 0.1),
            type: EmployeeType.COMMISSIONED,
            ...args
        };
    }
};
