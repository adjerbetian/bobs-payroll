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
import { dbModelSeeders } from "./dbModelSeeders";

export const entitySeeders = {
    async seedHourlyEmployee(args: Partial<HourlyEmployeeDBModel> = {}): Promise<HourlyEmployee> {
        const employee = await dbModelSeeders.seedHourlyEmployee(args);
        return buildHourlyEmployee(employee);
    },
    async seedSalariedEmployee(args: Partial<SalariedEmployeeDBModel> = {}): Promise<SalariedEmployee> {
        const employee = await dbModelSeeders.seedSalariedEmployee(args);
        return buildSalariedEmployee(employee);
    },
    async seedCommissionedEmployee(args: Partial<CommissionedEmployeeDBModel> = {}): Promise<CommissionedEmployee> {
        const employee = await dbModelSeeders.seedCommissionedEmployee(args);
        return buildCommissionedEmployee(employee);
    },
    async seedUnionMember(args: Partial<UnionMemberDBModel> = {}): Promise<UnionMember> {
        const unionMember = await dbModelSeeders.seedUnionMember(args);
        return buildUnionMember(unionMember);
    },
    async seedTimeCard(args: Partial<TimeCardDBModel> = {}): Promise<TimeCard> {
        const timeCard = await dbModelSeeders.seedTimeCard(args);
        return buildTimeCard(timeCard);
    }
};
