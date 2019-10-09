import { expect, generateIndex } from "@payroll/test";
import { ObjectID } from "bson";
import { Collection } from "mongodb";
import { getDb } from "../databases";
import { MongoModel } from "../DBModels";
import { makeMongoDbAdapter, MongoDbAdapter } from "./mongoDbAdapter";

let mongo: Collection<TestDBModel>;
let adapter: MongoDbAdapter<TestDBModel>;

class CustomNotFoundError extends Error {}

describe("mongoDbAdapter", () => {
    beforeEach(() => {
        mongo = getDb().collection<TestDBModel>("test-collection");
        adapter = makeMongoDbAdapter(mongo, CustomNotFoundError);
    });

    describe("fetch", () => {
        it("should return the requested stored object", async () => {
            await seedDBModel();
            const model = await seedDBModel();
            await seedDBModel();

            const result = await adapter.fetch({ id: model.id });

            expect(result).to.deep.equal(model);
        });
        it("should throw a CustomNotFoundError when the model was not found", async () => {
            const promise = adapter.fetch({ id: generateIndex() });

            await expect(promise).to.be.rejectedWith(CustomNotFoundError);
        });
    });
    describe("fetchLast", () => {
        it("should return the last stored object", async () => {
            await seedDBModel();
            const lastModel = await seedDBModel();

            const result = await adapter.fetchLast({});

            expect(result).to.deep.equal(lastModel);
        });
        it("should throw a CustomNotFoundError when the model was not found", async () => {
            const promise = adapter.fetchLast({ id: generateIndex() });

            await expect(promise).to.be.rejectedWith(CustomNotFoundError);
        });
    });
    describe("insert", () => {
        it("should insert the model", async () => {
            const model = generateDBModel();

            await adapter.insert(model);

            const dbModel = await mongo.findOne({ id: model.id });
            expect(dbModel).to.deep.equal(model);
        });
        it("should add the object id to the model", async () => {
            const model = generateDBModel();

            await adapter.insert(model);

            const dbModel = await mongo.findOne({ id: model.id });
            expect(dbModel!._id).to.be.an.instanceOf(ObjectID);
        });
    });
    describe("exists", () => {
        it("should return true when the object exists", async () => {
            const model = await seedDBModel();

            const result = await adapter.exists({ id: model.id });

            expect(result).to.be.true;
        });
        it("should return false when the object doesn't exist", async () => {
            const result = await adapter.exists({ id: generateIndex() });

            expect(result).to.be.false;
        });
    });
    describe("remove", () => {
        it("should delete the model", async () => {
            const model = await seedDBModel();

            await adapter.remove({ id: model.id });

            const modelExists = await adapter.exists({ id: generateIndex() });
            await expect(modelExists).to.be.false;
        });
        it("should throw a CustomNotFoundError when the model doesn't exist", async () => {
            const promise = adapter.remove({ id: generateIndex() });

            await expect(promise).to.be.rejectedWith(CustomNotFoundError);
        });
    });
    describe("update", () => {
        it("should update the model", async () => {
            const model = await seedDBModel();

            await adapter.update({ id: model.id }, { $set: { field: "new value" } });

            const dbModel = await mongo.findOne({ id: model.id });
            expect(dbModel).to.have.property("field", "new value");
        });
        it("should throw a CustomNotFoundError when the model doesn't exist", async () => {
            const promise = adapter.update({ id: generateIndex() }, { $set: { field: "new value" } });

            await expect(promise).to.be.rejectedWith(CustomNotFoundError);
        });
    });
    describe("fetchAll", () => {
        it("should return all the stored objects", async () => {
            const model1 = await seedDBModel();
            const model2 = await seedDBModel();

            const result = await adapter.fetchAll({});

            expect(result).to.deep.equal([model1, model2]);
        });
        it("should return only the matching stored objects", async () => {
            await seedDBModel({ field: "group-1" });
            await seedDBModel({ field: "group-2" });

            const result = await adapter.fetchAll({ field: "group-1" });

            expect(result).to.have.lengthOf(1);
        });
    });
    describe("removeAll", () => {
        it("should delete all the models", async () => {
            await seedDBModel({ field: "group-1" });
            await seedDBModel({ field: "group-1" });

            await adapter.removeAll({ field: "group-1" });

            const dbModels = await mongo.find({}).toArray();
            expect(dbModels).to.be.empty;
        });
        it("should not delete the non matching models", async () => {
            await seedDBModel({ field: "group-2" });

            await adapter.removeAll({ field: "group-1" });

            const dbModels = await mongo.find({}).toArray();
            expect(dbModels).to.have.lengthOf(1);
        });
    });
});

async function seedDBModel(args: Partial<TestDBModel> = {}): Promise<TestDBModel> {
    const dbModel = generateDBModel(args);
    await mongo.insertOne(dbModel);
    return dbModel;
}

function generateDBModel(args: Partial<TestDBModel> = {}): TestDBModel {
    const index = generateIndex();
    return {
        id: index,
        field: `value-of-${index}`,
        ...args
    };
}

interface TestDBModel extends MongoModel {
    id: number;
    field: string;
}
