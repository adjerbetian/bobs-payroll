import { FilterQuery, UpdateQuery } from "mongodb";
import { Mapper } from "../mappers";
import { MongoDbAdapter } from "./mongoDbAdapter";

export interface MongoEntity<Entity, DBModel> {
    fetch(query: FilterQuery<DBModel>): Promise<Entity>;
    fetchLast(query: FilterQuery<DBModel>): Promise<Entity>;
    insert(entity: Entity): Promise<void>;
    exists(query: FilterQuery<DBModel>): Promise<boolean>;
    remove(query: FilterQuery<DBModel>): Promise<void>;
    update(query: FilterQuery<DBModel>, update: UpdateQuery<DBModel>): Promise<void>;

    fetchAll(query: FilterQuery<DBModel>): Promise<Entity[]>;
    removeAll(query: FilterQuery<DBModel>): Promise<void>;
}

export function makeMongoEntity<Entity, DBModel>(
    adapter: MongoDbAdapter<DBModel>,
    mapper: Mapper<Entity, DBModel>
): MongoEntity<Entity, DBModel> {
    return {
        fetch: pipe(
            adapter.fetch,
            mapper.toEntity
        ),
        fetchLast: pipe(
            adapter.fetchLast,
            mapper.toEntity
        ),
        insert: pipe(
            mapper.toDBModel,
            adapter.insert
        ),
        fetchAll: pipe(
            adapter.fetchAll,
            mapper.toEntities
        ),
        exists: adapter.exists,
        remove: adapter.remove,
        update: adapter.update,
        removeAll: adapter.removeAll
    };
}

function pipe<In, Temp, Out>(
    f: (v: In) => Promise<Temp> | Temp,
    g: (v: Temp) => Promise<Out> | Out
): (v: In) => Promise<Out> {
    return async args => await g(await f(args));
}
