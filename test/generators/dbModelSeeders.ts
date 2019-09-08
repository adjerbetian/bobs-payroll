import {
    CommissionedEmployeeDBModel,
    dbEmployees,
    dbTimeCards,
    dbUnionMembers,
    HourlyEmployeeDBModel,
    SalariedEmployeeDBModel,
    TimeCardDBModel,
    UnionMemberDBModel
} from "../../src";
import { dbModelGenerators } from "./dbModelGenerators";

export const dbModelSeeders = {
    async seedHourlyEmployee(args: Partial<HourlyEmployeeDBModel> = {}): Promise<HourlyEmployeeDBModel> {
        const employee = dbModelGenerators.generateHourlyEmployee(args);
        await dbEmployees.insert(employee);
        return employee;
    },
    async seedSalariedEmployee(args: Partial<SalariedEmployeeDBModel> = {}): Promise<SalariedEmployeeDBModel> {
        const employee = dbModelGenerators.generateSalariedEmployee(args);
        await dbEmployees.insert(employee);
        return employee;
    },
    async seedCommissionedEmployee(
        args: Partial<CommissionedEmployeeDBModel> = {}
    ): Promise<CommissionedEmployeeDBModel> {
        const employee = dbModelGenerators.generateCommissionedEmployee(args);
        await dbEmployees.insert(employee);
        return employee;
    },
    async seedUnionMember(args: Partial<UnionMemberDBModel> = {}): Promise<UnionMemberDBModel> {
        const unionMember = dbModelGenerators.generateUnionMember(args);
        await dbUnionMembers.insert(unionMember);
        return unionMember;
    },
    async seedTimeCard(args: Partial<TimeCardDBModel> = {}): Promise<TimeCardDBModel> {
        const timeCard = dbModelGenerators.generateTimeCard(args);
        await dbTimeCards.insert(timeCard);
        return timeCard;
    }
};
