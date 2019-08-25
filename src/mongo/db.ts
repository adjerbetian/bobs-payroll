import { Collection, Db, MongoClient, ObjectID } from "mongodb";
import * as config from "../config.json";
import { Employee, PaymentMethod, SalesReceipt, ServiceCharge, TimeCard } from "../domain";

export let dbEmployees: Collection<DBEmployee>;
export let dbTimeCards: Collection<DBTimeCard>;
export let dbSalesReceipts: Collection<DBSalesReceipt>;
export let dbServiceCharges: Collection<DBServiceCharge>;
export let dbPaymentMethods: Collection<DBPaymentMethod>;

let client: MongoClient;

export async function initConnection(): Promise<void> {
    client = await MongoClient.connect(config.db.url, { useUnifiedTopology: true, useNewUrlParser: true });
    const db = getDB();
    dbEmployees = db.collection<DBEmployee>("employees");
    dbTimeCards = db.collection<DBTimeCard>("time-cards");
    dbSalesReceipts = db.collection<DBSalesReceipt>("sales-receipts");
    dbServiceCharges = db.collection<DBServiceCharge>("service-charges");
    dbPaymentMethods = db.collection<DBPaymentMethod>("payment-methods");
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
type DBPaymentMethod = DBModel<PaymentMethod>;
