import { Collection, Db, MongoClient, ObjectID } from "mongodb";
import * as config from "../config.json";
import { Employee, SalesReceipt, TimeCard } from "../entities";
import { ServiceCharge } from "../entities/ServiceCharge";

export let dbEmployees: Collection<DBEmployee>;
export let dbTimeCards: Collection<DBTimeCard>;
export let dbSalesReceipt: Collection<DBSalesReceipt>;
export let dbServiceCharge: Collection<DBServiceCharge>;

const client = new MongoClient(config.db.url);

export async function initConnection(): Promise<void> {
    await client.connect();
    const db = getDB();
    dbEmployees = db.collection<DBEmployee>("employees");
    dbTimeCards = db.collection<DBTimeCard>("time-cards");
    dbSalesReceipt = db.collection<DBSalesReceipt>("sales-receipts");
    dbServiceCharge = db.collection<DBServiceCharge>("service-charges");
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
interface DBServiceCharge extends ServiceCharge {
    _id?: ObjectID;
}
