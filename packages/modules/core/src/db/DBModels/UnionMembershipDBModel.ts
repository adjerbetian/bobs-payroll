import { MongoModel } from "@infra/mongo";

export interface UnionMembershipDBModel extends MongoModel {
    employeeId: number;
    memberId: string;
    rate: number;
}
