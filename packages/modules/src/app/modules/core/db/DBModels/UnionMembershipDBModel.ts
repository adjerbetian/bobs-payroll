import { MongoModel } from "@bobs-payroll/mongo";

export interface UnionMembershipDBModel extends MongoModel {
    employeeId: number;
    memberId: string;
    rate: number;
}
