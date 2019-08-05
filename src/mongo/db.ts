import { Collection, Db, MongoClient, ObjectID } from "mongodb";
import * as config from "../config.json";
import { Employee, SalesReceipt, TimeCard } from "../entities";

export let dbEmployees: Collection<DBEmployee>;
export let dbTimeCards: Collection<DBTimeCard>;
export let dbSalesReceipt: Collection<DBSalesReceipt>;

const client = new MongoClient(config.db.url);

export async function initConnection(): Promise<void> {
    await client.connect();
    const db = getDB();
    dbEmployees = db.collection<DBEmployee>("employees");
    dbTimeCards = db.collection<DBTimeCard>("timecards");
    dbSalesReceipt = db.collection<DBSalesReceipt>("salesreceipts");
}

export async function closeConnection(): Promise<void> {
    await client.close();
}

export async function cleanCollections(): Promise<void> {
    const collections = await getDB().collections();
    await Promise.all(collections.map(async c => getDB().dropCollection(c.collectionName)));
}

function getDB(): Db {
    return client.db(config.db.dbName);
}

interface DBEmployee extends Employee {
    _id?: ObjectID;
}
interface DBTimeCard extends TimeCard {
    _id?: ObjectID;
}
interface DBSalesReceipt extends SalesReceipt {
    _id?: ObjectID;
}
