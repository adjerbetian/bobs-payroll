import { FilterQuery, UpdateQuery } from "mongodb";
import { EntityModel, Mapper } from "../mappers";
import { MongoDbAdapter } from "./mongoDbAdapter";

type EntityFilterQuery<Entity> = FilterQuery<EntityModel<Entity>>;
type EntityUpdateQuery<Entity> = UpdateQuery<EntityModel<Entity>>;

export interface MongoEntity<Entity> {
    fetch(query: EntityFilterQuery<Entity>): Promise<Entity>;
    fetchLast(query: EntityFilterQuery<Entity>): Promise<Entity>;
    insert(entity: Entity): Promise<void>;
    exists(query: EntityFilterQuery<Entity>): Promise<boolean>;
    remove(query: EntityFilterQuery<Entity>): Promise<void>;
    update(query: EntityFilterQuery<Entity>, update: EntityUpdateQuery<Entity>): Promise<void>;

    fetchAll(query: EntityFilterQuery<Entity>): Promise<Entity[]>;
    removeAll(query: EntityFilterQuery<Entity>): Promise<void>;
}

export function makeMongoEntity<Entity>(
    adapter: MongoDbAdapter<EntityModel<Entity>>,
    mapper: Mapper<Entity>
): MongoEntity<Entity> {
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
