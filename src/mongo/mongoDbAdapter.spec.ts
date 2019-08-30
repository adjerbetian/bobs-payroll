import { expect, generateIndex } from "@test/integration";
import { cloneDeep } from "lodash";
import { Collection } from "mongodb";
import { NotFoundError } from "../domain";
import { getDb } from "./db";
import { buildMongoDbAdapter, MongoDbAdapter } from "./mongoDbAdapter";

interface Entity {
    id: number;
    field: string;
}

let mongo: Collection<Entity>;
let adapter: MongoDbAdapter<Entity>;

describe("mongoDbAdapter", () => {
    beforeEach(() => {
        mongo = getDb().collection<Entity>("test-collection");
        adapter = buildMongoDbAdapter(mongo);
    });

    describe("fetch", () => {
        it("should return the requested stored object", async () => {
            await seedEntity();
            const entity = await seedEntity();
            await seedEntity();

            const dbEntity = await adapter.fetch({ id: entity.id });

            expect(dbEntity).to.deep.include(entity);
        });
        it("should not return the mongo _id", async () => {
            const entity = await seedEntity();

            const dbEntity = await adapter.fetch({ id: entity.id });

            expect(dbEntity).not.to.have.property("_id");
        });
        it("should throw a NotFoundError when the entity was not found", async () => {
            const promise = adapter.fetch({ id: generateIndex() });

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
    describe("fetchLast", () => {
        it("should return the last stored object", async () => {
            await seedEntity();
            const lastEntity = await seedEntity();

            const dbEntity = await adapter.fetchLast({});

            expect(dbEntity).to.deep.include(lastEntity);
        });
        it("should not return the mongo _id", async () => {
            const entity = await seedEntity();

            const dbEntity = await adapter.fetchLast({ id: entity.id });

            expect(dbEntity).not.to.have.property("_id");
        });
        it("should throw a NotFoundError when the entity was not found", async () => {
            const promise = adapter.fetchLast({ id: generateIndex() });

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
    describe("insert", () => {
        it("should insert the entity", async () => {
            const entity = generateEntity();

            await adapter.insert(entity);

            const dbEntity = await mongo.findOne({ id: entity.id });
            expect(dbEntity).to.deep.include(entity);
        });
        it("should not modify the entity", async () => {
            const entity = generateEntity();
            const entityCopy = cloneDeep(entity);

            await adapter.insert(entity);

            expect(entity).to.deep.equal(entityCopy);
        });
    });
    describe("exists", () => {
        it("should return true when the object exists", async () => {
            const entity = await seedEntity();

            const result = await adapter.exists({ id: entity.id });

            expect(result).to.be.true;
        });
        it("should return false when the object doesn't exist", async () => {
            const result = await adapter.exists({ id: generateIndex() });

            expect(result).to.be.false;
        });
    });
    describe("remove", () => {
        it("should delete the entity", async () => {
            const entity = await seedEntity();

            await adapter.remove({ id: entity.id });

            const dbEntity = await mongo.findOne({ id: entity.id });
            expect(dbEntity).to.be.null;
        });
        it("should throw a NotFoundError when the entity doesn't exist", async () => {
            const promise = adapter.remove({ id: generateIndex() });

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
    describe("update", () => {
        it("should update the entity", async () => {
            const entity = await seedEntity();

            await adapter.update({ id: entity.id }, { $set: { field: "new value" } });

            const dbEntity = await mongo.findOne({ id: entity.id });
            expect(dbEntity).to.have.property("field", "new value");
        });
        it("should throw a NotFoundError when the entity doesn't exist", async () => {
            const promise = adapter.update({ id: generateIndex() }, { $set: { field: "new value" } });

            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
    });
    describe("fetchAll", () => {
        it("should return all the stored objects", async () => {
            const entity1 = await seedEntity();
            const entity2 = await seedEntity();

            const dbEntities = await adapter.fetchAll({});

            expect(dbEntities).to.have.lengthOf(2);
            expect(dbEntities[0]).to.deep.include(entity1);
            expect(dbEntities[1]).to.deep.include(entity2);
        });
        it("should return only the matching stored objects", async () => {
            await seedEntity({ field: "group-1" });
            await seedEntity({ field: "group-2" });

            const dbEntities = await adapter.fetchAll({ field: "group-1" });

            expect(dbEntities).to.have.lengthOf(1);
        });
        it("should not return the mongo _id", async () => {
            await seedEntity();

            const dbEntities = await adapter.fetchAll({});

            expect(dbEntities[0]).not.to.have.property("_id");
        });
    });
    describe("removeAll", () => {
        it("should delete all the entities", async () => {
            await seedEntity({ field: "group-1" });
            await seedEntity({ field: "group-1" });

            await adapter.removeAll({ field: "group-1" });

            const dbEntities = await mongo.find({}).toArray();
            expect(dbEntities).to.be.empty;
        });
        it("should not delete the non matching entities", async () => {
            await seedEntity({ field: "group-2" });

            await adapter.removeAll({ field: "group-1" });

            const dbEntities = await mongo.find({}).toArray();
            expect(dbEntities).to.have.lengthOf(1);
        });
    });
});

async function seedEntity(args: Partial<Entity> = {}): Promise<Entity> {
    const entity = generateEntity(args);
    await mongo.insertOne(cloneDeep(entity));
    return entity;
}

function generateEntity(args: Partial<Entity> = {}): Entity {
    return {
        id: generateIndex(),
        field: `value-${generateIndex()}`,
        ...args
    };
}
