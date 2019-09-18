import { Db, MongoClient } from "mongodb";
import * as config from "../../../config.json";
import { Employee, PaymentMethod, SalesReceipt, ServiceCharge, TimeCard, UnionMember } from "../../domain";
import {
    EmployeeDBModel,
    PaymentMethodDBModel,
    SalesReceiptDBModel,
    ServiceChargeDBModel,
    TimeCardDBModel,
    UnionMemberDBModel
} from "../DBModels";
import {
    employeeMapper,
    Mapper,
    paymentMethodMapper,
    salesReceiptMapper,
    serviceChargeMapper,
    timeCardMapper,
    unionMemberMapper
} from "../mappers";
import { makeMongoDbAdapter } from "./mongoDbAdapter";
import { buildMongoEntity, MongoEntity } from "./mongoEntity";

export const dbEmployees: MongoEntity<Employee, EmployeeDBModel> = buildEmptyObject();
export const dbTimeCards: MongoEntity<TimeCard, TimeCardDBModel> = buildEmptyObject();
export const dbSalesReceipts: MongoEntity<SalesReceipt, SalesReceiptDBModel> = buildEmptyObject();
export const dbServiceCharges: MongoEntity<ServiceCharge, ServiceChargeDBModel> = buildEmptyObject();
export const dbPaymentMethods: MongoEntity<PaymentMethod, PaymentMethodDBModel> = buildEmptyObject();
export const dbUnionMembers: MongoEntity<UnionMember, UnionMemberDBModel> = buildEmptyObject();

let client: MongoClient;

const databaseBuilders: Array<() => Promise<void>> = [];

export function buildDatabase<Entity, DBModel>(
    collectionName: string,
    mapper: Mapper<Entity, DBModel>
): MongoEntity<Entity, DBModel> {
    const mongoEntity = {} as MongoEntity<Entity, DBModel>;
    databaseBuilders.push(async () => {
        const db = getDb();
        const dbCollection = db.collection<DBModel>(collectionName);
        const adapter = makeMongoDbAdapter(dbCollection);
        Object.assign(mongoEntity, buildMongoEntity(adapter, mapper));
    });
    return mongoEntity;
}

export async function initConnection(): Promise<void> {
    client = await MongoClient.connect(config.db.url, { useUnifiedTopology: true, useNewUrlParser: true });
    await Promise.all(databaseBuilders.map(async f => f()));

    const db = getDb();
    assignCollectionToDB(dbEmployees, "employees", employeeMapper);
    assignCollectionToDB(dbTimeCards, "time-cards", timeCardMapper);
    assignCollectionToDB(dbSalesReceipts, "sales-receipts", salesReceiptMapper);
    assignCollectionToDB(dbServiceCharges, "service-charges", serviceChargeMapper);
    assignCollectionToDB(dbPaymentMethods, "payment-methods", paymentMethodMapper);
    assignCollectionToDB(dbUnionMembers, "union-members", unionMemberMapper);

    function assignCollectionToDB<Entity, DBModel>(
        collection: MongoEntity<Entity, DBModel>,
        collectionName: string,
        mapper: Mapper<Entity, DBModel>
    ): void {
        const dbCollection = db.collection<DBModel>(collectionName);
        const adapter = makeMongoDbAdapter(dbCollection);
        const mongoEntity = buildMongoEntity(adapter, mapper);
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
