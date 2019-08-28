import { Db, MongoClient } from "mongodb";
import * as config from "../config.json";
import { Employee, Payment, PaymentMethod, SalesReceipt, ServiceCharge, TimeCard, UnionMember } from "../domain";
import { buildMongoDbAdapter, MongoDbAdapter } from "./mongoDbAdapter";

export const dbEmployees: MongoDbAdapter<Employee> = buildEmptyObject();
export const dbTimeCards: MongoDbAdapter<TimeCard> = buildEmptyObject();
export const dbSalesReceipts: MongoDbAdapter<SalesReceipt> = buildEmptyObject();
export const dbServiceCharges: MongoDbAdapter<ServiceCharge> = buildEmptyObject();
export const dbPaymentMethods: MongoDbAdapter<PaymentMethod> = buildEmptyObject();
export const dbUnionMembers: MongoDbAdapter<UnionMember> = buildEmptyObject();
export const dbPayments: MongoDbAdapter<Payment> = buildEmptyObject();

let client: MongoClient;

export async function initConnection(): Promise<void> {
    client = await MongoClient.connect(config.db.url, { useUnifiedTopology: true, useNewUrlParser: true });
    const db = getDb();
    Object.assign(dbEmployees, buildMongoDbAdapter(db.collection("employees")));
    Object.assign(dbTimeCards, buildMongoDbAdapter(db.collection("time-cards")));
    Object.assign(dbSalesReceipts, buildMongoDbAdapter(db.collection("sales-receipts")));
    Object.assign(dbServiceCharges, buildMongoDbAdapter(db.collection("service-charges")));
    Object.assign(dbPaymentMethods, buildMongoDbAdapter(db.collection("payment-methods")));
    Object.assign(dbUnionMembers, buildMongoDbAdapter(db.collection("union-members")));
    Object.assign(dbPayments, buildMongoDbAdapter(db.collection("payments")));
}

export async function closeConnection(): Promise<void> {
    await client.close();
}

export async function cleanCollections(): Promise<void> {
    const collections = await getDb().collections();
    await Promise.all(collections.map(async c => getDb().dropCollection(c.collectionName)));
}

export function getDb(): Db {
    return client.db(config.db.dbName);
}

function buildEmptyObject<T>(): T {
    return {} as T;
}
