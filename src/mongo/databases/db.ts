import { Db, MongoClient } from "mongodb";
import * as config from "../../config.json";
import { Payment, PaymentMethod, SalesReceipt, ServiceCharge } from "../../domain";
import { EmployeeDBModel, TimeCardDBModel, UnionMemberDBModel } from "../DBModels";
import { makeMongoDbAdapter, MongoDbAdapter } from "./mongoDbAdapter";

export const dbEmployees: MongoDbAdapter<EmployeeDBModel> = buildEmptyObject();
export const dbTimeCards: MongoDbAdapter<TimeCardDBModel> = buildEmptyObject();
export const dbSalesReceipts: MongoDbAdapter<SalesReceipt> = buildEmptyObject();
export const dbServiceCharges: MongoDbAdapter<ServiceCharge> = buildEmptyObject();
export const dbPaymentMethods: MongoDbAdapter<PaymentMethod> = buildEmptyObject();
export const dbUnionMembers: MongoDbAdapter<UnionMemberDBModel> = buildEmptyObject();
export const dbPayments: MongoDbAdapter<Payment> = buildEmptyObject();

let client: MongoClient;

export async function initConnection(): Promise<void> {
    client = await MongoClient.connect(config.db.url, { useUnifiedTopology: true, useNewUrlParser: true });
    const db = getDb();
    Object.assign(dbEmployees, makeMongoDbAdapter(db.collection("employees")));
    Object.assign(dbTimeCards, makeMongoDbAdapter(db.collection("time-cards")));
    Object.assign(dbSalesReceipts, makeMongoDbAdapter(db.collection("sales-receipts")));
    Object.assign(dbServiceCharges, makeMongoDbAdapter(db.collection("service-charges")));
    Object.assign(dbPaymentMethods, makeMongoDbAdapter(db.collection("payment-methods")));
    Object.assign(dbUnionMembers, makeMongoDbAdapter(db.collection("union-members")));
    Object.assign(dbPayments, makeMongoDbAdapter(db.collection("payments")));
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
