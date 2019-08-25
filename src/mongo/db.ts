import { Db, MongoClient, ObjectID } from "mongodb";
import * as config from "../config.json";
import { Employee, PaymentMethod, SalesReceipt, ServiceCharge, TimeCard, UnionMember } from "../domain";
import { buildMongoDbAdapter, MongoDbAdapter } from "./mongoDbAdapter";

export type DBModel<T> = T & { _id?: ObjectID };
export let dbEmployees: MongoDbAdapter<Employee>;
export let dbTimeCards: MongoDbAdapter<TimeCard>;
export let dbSalesReceipts: MongoDbAdapter<SalesReceipt>;
export let dbServiceCharges: MongoDbAdapter<ServiceCharge>;
export let dbPaymentMethods: MongoDbAdapter<PaymentMethod>;
export let dbUnionMembers: MongoDbAdapter<UnionMember>;

let client: MongoClient;

export async function initConnection(): Promise<void> {
    client = await MongoClient.connect(config.db.url, { useUnifiedTopology: true, useNewUrlParser: true });
    const db = getDB();
    dbEmployees = buildMongoDbAdapter(db.collection("employees"));
    dbTimeCards = buildMongoDbAdapter(db.collection("time-cards"));
    dbSalesReceipts = buildMongoDbAdapter(db.collection("sales-receipts"));
    dbServiceCharges = buildMongoDbAdapter(db.collection("service-charges"));
    dbPaymentMethods = buildMongoDbAdapter(db.collection("payment-methods"));
    dbUnionMembers = buildMongoDbAdapter(db.collection("union-members"));
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
