import { ObjectID } from "bson";

export interface MongoModel {
    _id?: ObjectID;
}
