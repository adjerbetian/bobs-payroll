import { MongoModel } from "../../../../mongo";

export interface ServiceChargeDBModel extends MongoModel {
    memberId: string;
    amount: number;
}
