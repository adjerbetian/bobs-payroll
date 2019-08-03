import { Db, MongoClient } from "mongodb";
import * as config from "./config.json";

const client = new MongoClient(config.db.url);
export let db: Db;

export async function initConnection(): Promise<void> {
    await client.connect();
    db = client.db(config.db.dbName);
}

export async function closeConnection(): Promise<void> {
    await client.close();
}
