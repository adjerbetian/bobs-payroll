import { Collection, MongoClient, ObjectID } from "mongodb";
import * as config from "../config.json";
import { Employee } from "../entities/Employee";

export let dbEmployees: Collection<DBEmployee>;

const client = new MongoClient(config.db.url);

export async function initConnection(): Promise<void> {
    await client.connect();
    const db = client.db(config.db.dbName);
    dbEmployees = db.collection<DBEmployee>("employees");
}

export async function closeConnection(): Promise<void> {
    await client.close();
}

export async function cleanCollections(): Promise<void> {
    await dbEmployees.deleteMany({});
}

interface DBEmployee extends Employee {
    _id?: ObjectID;
}
