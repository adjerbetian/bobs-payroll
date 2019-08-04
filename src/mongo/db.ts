import { Collection, MongoClient, ObjectID } from "mongodb";
import * as config from "../config.json";
import { Employee, TimeCard } from "../entities";

export let dbEmployees: Collection<DBEmployee>;
export let dbTimeCards: Collection<DBTimeCard>;

const client = new MongoClient(config.db.url);

export async function initConnection(): Promise<void> {
    await client.connect();
    const db = client.db(config.db.dbName);
    dbEmployees = db.collection<DBEmployee>("employees");
    dbTimeCards = db.collection<DBTimeCard>("timecards");
}

export async function closeConnection(): Promise<void> {
    await client.close();
}

export async function cleanCollections(): Promise<void> {
    await dbEmployees.deleteMany({});
    await dbTimeCards.deleteMany({});
}

interface DBEmployee extends Employee {
    _id?: ObjectID;
}
interface DBTimeCard extends TimeCard {
    _id?: ObjectID;
}
