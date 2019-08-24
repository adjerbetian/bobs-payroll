import { Collection, Db, MongoClient, ObjectID } from "mongodb";
import * as config from "../config.json";
import { Employee, SalesReceipt, ServiceCharge, TimeCard } from "../domain";

export let dbEmployees: Collection<DBEmployee>;
export let dbTimeCards: Collection<DBTimeCard>;
export let dbSalesReceipt: Collection<DBSalesReceipt>;
export let dbServiceCharge: Collection<DBServiceCharge>;

let client: MongoClient;

export async function initConnection(): Promise<void> {
    client = await MongoClient.connect(config.db.url, { useUnifiedTopology: true, useNewUrlParser: true });
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

type DBModel<T> = T & { _id?: ObjectID };
type DBEmployee = DBModel<Employee>;
type DBTimeCard = DBModel<TimeCard>;
type DBSalesReceipt = DBModel<SalesReceipt>;
type DBServiceCharge = DBModel<ServiceCharge>;
