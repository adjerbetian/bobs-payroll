import { MongoModel } from "../../../../mongo";

export interface UnionMembershipDBModel extends MongoModel {
    employeeId: number;
    memberId: string;
    rate: number;
}
