import { MongoModel } from "./MongoModel";

export interface UnionMemberDBModel extends MongoModel {
    employeeId: number;
    memberId: string;
    rate: number;
}
