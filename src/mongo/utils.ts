import { ObjectId } from "bson";

export function cleanMongoEntity<T>(entity: MongoEntity<T>): T {
    delete entity._id;
    return entity;
}

type MongoEntity<T> = T & { _id?: ObjectId };
