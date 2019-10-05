import { Db, MongoClient } from "mongodb";
import * as config from "../../../config.json";
import { Mapper } from "../mappers";
import { makeMongoDbAdapter } from "./mongoDbAdapter";
import { buildMongoEntity, MongoEntity } from "./mongoEntity";

let client: MongoClient;

const databaseBuilders: Array<() => Promise<void>> = [];

export function buildDatabase<Entity, DBModel>(
    collectionName: string,
    mapper: Mapper<Entity, DBModel>,
    NotFoundErrorClass: new (message: string) => Error
): MongoEntity<Entity, DBModel> {
    const mongoEntity = {} as MongoEntity<Entity, DBModel>;
    databaseBuilders.push(async () => {
        const db = getDb();
        const dbCollection = db.collection<DBModel>(collectionName);
        const adapter = makeMongoDbAdapter(dbCollection, NotFoundErrorClass);
        Object.assign(mongoEntity, buildMongoEntity(adapter, mapper));
    });
    return mongoEntity;
}

export async function initConnection(): Promise<void> {
    client = await MongoClient.connect(config.db.url, { useUnifiedTopology: true, useNewUrlParser: true });
    await Promise.all(databaseBuilders.map(async f => f()));
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
