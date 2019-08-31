import { Stub, buildStubFor } from "@test/unit";
import { MongoDbAdapter } from "../mongoDbAdapter";

export function buildStubbedMongoDbAdapter<T>(): Stub<MongoDbAdapter<T>> {
    return buildStubFor({
        fetch: true,
        fetchLast: true,
        insert: true,
        exists: true,
        remove: true,
        update: true,
        fetchAll: true,
        removeAll: true
    });
}
