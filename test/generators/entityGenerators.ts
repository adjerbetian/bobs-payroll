import {
    buildCommissionedEmployee,
    buildHourlyEmployee,
    buildSalariedEmployee,
    buildTimeCard,
    buildUnionMember,
    CommissionedEmployee,
    CommissionedEmployeeDBModel,
    HourlyEmployee,
    HourlyEmployeeDBModel,
    SalariedEmployee,
    SalariedEmployeeDBModel,
    TimeCard,
    TimeCardDBModel,
    UnionMember,
    UnionMemberDBModel
} from "../../src";
import { dbModelGenerators } from "./dbModelGenerators";

export const entityGenerators = {
    generateHourlyEmployee(args: Partial<HourlyEmployeeDBModel> = {}): HourlyEmployee {
        return buildHourlyEmployee(dbModelGenerators.generateHourlyEmployee(args));
    },
    generateSalariedEmployee(args: Partial<SalariedEmployeeDBModel> = {}): SalariedEmployee {
        return buildSalariedEmployee(dbModelGenerators.generateSalariedEmployee(args));
    },
    generateCommissionedEmployee(args: Partial<CommissionedEmployeeDBModel> = {}): CommissionedEmployee {
        return buildCommissionedEmployee(dbModelGenerators.generateCommissionedEmployee(args));
    },
    generateTimeCard(args: Partial<TimeCardDBModel> = {}): TimeCard {
        return buildTimeCard(dbModelGenerators.generateTimeCard(args));
    },
    generateUnionMember(args: Partial<UnionMemberDBModel> = {}): UnionMember {
        return buildUnionMember(dbModelGenerators.generateUnionMember(args));
    }
};
