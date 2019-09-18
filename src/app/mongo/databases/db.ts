import { Db, MongoClient } from "mongodb";
import * as config from "../../../config.json";
import { Employee, Payment, PaymentMethod, SalesReceipt, ServiceCharge, TimeCard, UnionMember } from "../../domain";
import {
    EmployeeDBModel,
    PaymentDBModel,
    PaymentMethodDBModel,
    SalesReceiptDBModel,
    ServiceChargeDBModel,
    TimeCardDBModel,
    UnionMemberDBModel
} from "../DBModels";
import {
    employeeMapper,
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

export const dbEmployees: MongoEntity<Employee, EmployeeDBModel> = buildEmptyObject();
export const dbTimeCards: MongoEntity<TimeCard, TimeCardDBModel> = buildEmptyObject();
export const dbSalesReceipts: MongoEntity<SalesReceipt, SalesReceiptDBModel> = buildEmptyObject();
export const dbServiceCharges: MongoEntity<ServiceCharge, ServiceChargeDBModel> = buildEmptyObject();
export const dbPaymentMethods: MongoEntity<PaymentMethod, PaymentMethodDBModel> = buildEmptyObject();
export const dbUnionMembers: MongoEntity<UnionMember, UnionMemberDBModel> = buildEmptyObject();
export const dbPayments: MongoEntity<Payment, PaymentDBModel> = buildEmptyObject();

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

    function assignCollectionToDB<Entity, DBModel>(
        collection: MongoEntity<Entity, DBModel>,
        collectionName: string,
        mapper: Mapper<Entity, DBModel>
    ): void {
        const dbCollection = db.collection<DBModel>(collectionName);
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
