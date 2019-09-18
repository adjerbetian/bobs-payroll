import { Db, MongoClient } from "mongodb";
import * as config from "../../../config.json";
import { Employee, Payment, PaymentMethod, SalesReceipt, ServiceCharge, TimeCard, UnionMember } from "../../domain";
import {
    employeeMapper,
    EntityModel,
    Mapper,
    paymentMapper,
    paymentMethodMapper,
    salesReceiptMapper,
    serviceChargeMapper,
    timeCardMapper,
    unionMemberMapper
} from "../mappers";
import { makeMongoDbAdapter } from "./mongoDbAdapter";
import { makeMongoEntity, MongoEntity } from "./mongoEntity";

export const dbEmployees: MongoEntity<Employee> = buildEmptyObject();
export const dbTimeCards: MongoEntity<TimeCard> = buildEmptyObject();
export const dbSalesReceipts: MongoEntity<SalesReceipt> = buildEmptyObject();
export const dbServiceCharges: MongoEntity<ServiceCharge> = buildEmptyObject();
export const dbPaymentMethods: MongoEntity<PaymentMethod> = buildEmptyObject();
export const dbUnionMembers: MongoEntity<UnionMember> = buildEmptyObject();
export const dbPayments: MongoEntity<Payment> = buildEmptyObject();

let client: MongoClient;

export async function initConnection(): Promise<void> {
    client = await MongoClient.connect(config.db.url, { useUnifiedTopology: true, useNewUrlParser: true });
    const db = getDb();
    assignCollectionToDB(dbEmployees, "employees", employeeMapper);
    assignCollectionToDB(dbTimeCards, "time-cards", timeCardMapper);
    assignCollectionToDB(dbSalesReceipts, "sales-receipts", salesReceiptMapper);
    assignCollectionToDB(dbServiceCharges, "service-charges", serviceChargeMapper);
    assignCollectionToDB(dbPaymentMethods, "payment-methods", paymentMethodMapper);
    assignCollectionToDB(dbUnionMembers, "union-members", unionMemberMapper);
    assignCollectionToDB(dbPayments, "payments", paymentMapper);

    function assignCollectionToDB<Entity>(
        collection: MongoEntity<Entity>,
        collectionName: string,
        mapper: Mapper<Entity>
    ): void {
        const dbCollection = db.collection<EntityModel<Entity>>(collectionName);
        const adapter = makeMongoDbAdapter(dbCollection);
        const mongoEntity = makeMongoEntity(adapter, mapper);
        Object.assign(collection, mongoEntity);
    }
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
