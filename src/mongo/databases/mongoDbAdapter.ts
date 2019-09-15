import { Collection, FilterQuery, UpdateQuery } from "mongodb";
import { NotFoundError } from "../../domain";

export interface MongoDbAdapter<DBModel> {
    fetch(query: FilterQuery<DBModel>): Promise<DBModel>;
    fetchLast(query: FilterQuery<DBModel>): Promise<DBModel>;
    insert(dbModel: DBModel): Promise<void>;
    exists(query: FilterQuery<DBModel>): Promise<boolean>;
    remove(query: FilterQuery<DBModel>): Promise<void>;
    update(query: FilterQuery<DBModel>, update: UpdateQuery<DBModel>): Promise<void>;

    fetchAll(query: FilterQuery<DBModel>): Promise<DBModel[]>;
    removeAll(query: FilterQuery<DBModel>): Promise<void>;
}

export function makeMongoDbAdapter<DBModel>(db: Collection<DBModel>): MongoDbAdapter<DBModel> {
    return {
        async fetch(query) {
            const dbModel = await db.findOne(query);
            if (!dbModel) throw buildNotFoundError(query);
            return dbModel;
        },
        async fetchLast(query) {
            const [dbModel] = await db
                .find(query)
                .limit(1)
                .sort({ $natural: -1 })
                .toArray();
            if (!dbModel) throw buildNotFoundError(query);

            return dbModel;
        },
        async insert(dbModel) {
            await db.insertOne(dbModel);
        },
        async exists(query) {
            return !!(await db.findOne(query, { projection: { _id: 1 } }));
        },
        async remove(query) {
            const { deletedCount } = await db.deleteOne(query);
            if (deletedCount === 0) throw buildNotFoundError(query);
        },
        async update(query, update) {
            const { matchedCount } = await db.updateOne(query, update);
            if (matchedCount === 0) throw buildNotFoundError(query);
        },
        async fetchAll(query) {
            return await db.find(query).toArray();
        },
        async removeAll(query) {
            await db.deleteMany(query);
        }
    };

    function buildNotFoundError(query: FilterQuery<DBModel>): NotFoundError {
        return new NotFoundError(`nothing in ${db.collectionName} matched ${JSON.stringify(query)}`);
    }
}
