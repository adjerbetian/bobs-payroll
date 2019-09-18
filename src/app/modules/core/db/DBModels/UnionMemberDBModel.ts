import { MongoModel } from "../../../../mongo";

export interface UnionMemberDBModel extends MongoModel {
    employeeId: number;
    memberId: string;
    rate: number;
}
