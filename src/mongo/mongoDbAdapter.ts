import { Collection, FilterQuery, ObjectID, UpdateQuery } from "mongodb";
import { NotFoundError } from "../domain";

type DbModel<T> = T & { _id?: ObjectID };

export interface MongoDbAdapter<T> {
    fetch(query: FilterQuery<T>): Promise<T>;
    insert(entity: T): Promise<void>;
    exists(query: FilterQuery<T>): Promise<boolean>;
    remove(query: FilterQuery<T>): Promise<void>;
    update(query: FilterQuery<T>, update: UpdateQuery<T>): Promise<void>;

    fetchAll(query: FilterQuery<T>): Promise<T[]>;
    removeAll(query: FilterQuery<T>): Promise<void>;
}

export function buildMongoDbAdapter<T>(db: Collection<DbModel<T>>): MongoDbAdapter<T> {
    return {
        async fetch(query: FilterQuery<T>): Promise<T> {
            const entity = await db.findOne(query);
            if (!entity) throw buildNotFoundError(query);

            return cleanMongoEntity(entity);
        },

        async insert(entity: T): Promise<void> {
            await db.insertOne(entity);
            cleanMongoEntity(entity);
        },

        async exists(query: FilterQuery<T>): Promise<boolean> {
            return !!(await db.findOne(query, { projection: { _id: 1 } }));
        },

        async remove(query: FilterQuery<T>): Promise<void> {
            const { deletedCount } = await db.deleteOne(query);
            if (deletedCount === 0) throw buildNotFoundError(query);
        },

        async update(query: FilterQuery<T>, update: UpdateQuery<T>): Promise<void> {
            const { matchedCount } = await db.updateOne(query, update);
            if (matchedCount === 0) throw buildNotFoundError(query);
        },

        async fetchAll(query: FilterQuery<T>): Promise<T[]> {
            const entities = await db.find(query).toArray();
            return entities.map(entity => cleanMongoEntity(entity));
        },

        async removeAll(query: FilterQuery<T>): Promise<void> {
            await db.deleteMany(query);
        }
    };

    function buildNotFoundError(query: FilterQuery<T>): NotFoundError {
        return new NotFoundError(`nothing in ${db.collectionName} matched ${JSON.stringify(query)}`);
    }

    function cleanMongoEntity<T>(entity: DbModel<T>): T {
        delete entity._id;
        return entity;
    }
}
