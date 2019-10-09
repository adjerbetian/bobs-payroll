import { MongoModel } from "@payroll/mongo";

export interface UnionMembershipDBModel extends MongoModel {
    employeeId: number;
    memberId: string;
    rate: number;
}
