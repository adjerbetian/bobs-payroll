import { expect, sandbox } from "../unit";
import { SinonStub } from "sinon";
import { Entity } from "../../app";

describe("chaiEntity", () => {
    describe("entity.to.equal", function() {
        it("should work when both objects have a JSON method", () => {
            const assertion = buildAssertion(buildEntity({ a: "a" }), buildEntity({ a: "a" }));
            assertion();
            expect(assertion).not.to.throw();
        });
        it("should throw when the objects don't match", () => {
            const assertion = buildAssertion(buildEntity({ a: "a" }), buildEntity({ a: "b" }));
            expect(assertion).to.throw(buildExpectedEqualEntitiesMessage());
        });
        it("should throw when the first object is not an entity", () => {
            const assertion = buildAssertion({ a: "a" }, buildEntity({ a: "a" }));
            expect(assertion).to.throw(buildExpectedEntityMessage("{ a: 'a' }"));
        });
        it("should throw when the second object is not an entity", () => {
            const assertion = buildAssertion(buildEntity({ a: "a" }), { a: "a" });
            expect(assertion).to.throw(buildExpectedEntityMessage("{ a: 'a' }"));
        });

        function buildAssertion(object1: any, object2: any): () => void {
            return () => expect(object1).entity.to.equal(object2);
        }
    });
    describe("entities.to.equal", function() {
        it("should work when both array have same entities", () => {
            const assertion = buildAssertion(
                [buildEntity({ a: "a" }), buildEntity({ b: "b" })],
                [buildEntity({ a: "a" }), buildEntity({ b: "b" })]
            );
            expect(assertion).not.to.throw();
        });
        it("should throw when the objects don't match", () => {
            const assertion = buildAssertion(
                [buildEntity({ a: "a" }), buildEntity({ b: "b" })],
                [buildEntity({ a: "a" }), buildEntity({ b: "a" })]
            );
            expect(assertion).to.throw(
                `expected [ { a: 'a' }, { b: 'b' } ] to deeply equal [ { a: 'a' }, { b: 'a' } ]`
            );
        });
        it("should throw when the first array is not made of entities", () => {
            const assertion = buildAssertion(
                [buildEntity({ a: "a" }), { b: "b" }],
                [buildEntity({ a: "a" }), buildEntity({ b: "b" })]
            );
            expect(assertion).to.throw(`expected [ Array(2) ] to be an array of entities`);
        });
        it("should throw when the second array is not made of entities", () => {
            const assertion = buildAssertion(
                [buildEntity({ a: "a" }), buildEntity({ b: "b" })],
                [buildEntity({ a: "a" }), { b: "b" }]
            );
            expect(assertion).to.throw(`expected [ Array(2) ] to be an array of entities`);
        });

        function buildAssertion<T>(array1: T[], array2: T[]): () => void {
            return () => expect(array1).entities.to.equal(array2);
        }
    });
    describe("entities[.not].to.include", function() {
        it("should work when the array contains the entity", () => {
            const entities = [buildEntity({ a: "a" }), buildEntity({ b: "b" })];
            const entity = buildEntity({ a: "a" });

            const assertion = buildAssertion(entities, entity);

            expect(assertion).not.to.throw();
        });
        it("should throw when the array does't include the entity", () => {
            const entities = [buildEntity({ a: "a" }), buildEntity({ b: "b" })];
            const entity = buildEntity({ a: "b" });

            const assertion = buildAssertion(entities, entity as any);

            expect(assertion).to.throw(`expected [ { a: 'a' }, { b: 'b' } ] to deep include { a: 'b' }`);
        });
        it("[.not] should throw when the array contains the entity", () => {
            const entities = [buildEntity({ a: "a" }), buildEntity({ b: "b" })];
            const entity = buildEntity({ a: "a" });

            const assertion = buildNegativeAssertion(entities, entity);

            expect(assertion).to.throw(`expected [ { a: 'a' }, { b: 'b' } ] to not deep include { a: 'a' }`);
        });
        it("[.not] should work when the array does not contain the entity", () => {
            const entities = [buildEntity({ a: "a" }), buildEntity({ b: "b" })];
            const entity = buildEntity({ a: "b" });

            const assertion = buildNegativeAssertion(entities, entity);

            expect(assertion).not.to.throw();
        });
        it("should throw when the first array is not made of entities", () => {
            const entities = [buildEntity({ a: "a" }), { b: "b" }];
            const entity = buildEntity({ a: "a" });

            const assertion = buildAssertion(entities, entity);

            expect(assertion).to.throw(`expected [ Array(2) ] to be an array of entities`);
        });
        it("should throw when the element is not an entity", () => {
            const entities = [buildEntity({ a: "a" }), buildEntity({ b: "b" })];
            const entity = { b: "b" };

            const assertion = buildAssertion(entities, entity as any);

            expect(assertion).to.throw(`expected { b: 'b' } to be an entity`);
        });

        function buildAssertion<T>(array1: T[], element: T): () => void {
            return () => expect(array1).entities.to.include(element);
        }
        function buildNegativeAssertion<T>(array1: T[], element: T): () => void {
            return () => expect(array1).entities.not.to.include(element);
        }
    });
    describe("calledOnceWithEntity", function() {
        let stub: SinonStub;

        beforeEach(() => {
            stub = sandbox.stub();
        });

        it("should work when both objects have a JSON method", () => {
            const assertion = buildAssertion(buildEntity({ a: "a" }));

            stub(buildEntity({ a: "a" }));

            expect(assertion).not.to.throw();
        });
        it("should throw when the argument is not an entity", () => {
            const assertion = buildAssertion(buildEntity({ a: "a" }));

            stub({ a: "a" });

            expect(assertion).to.throw(buildExpectedEntityMessage("{ a: 'a' }"));
        });
        it("should throw when the expected is not an entity", () => {
            const assertion = buildAssertion({ a: "a" });

            stub(buildEntity({ a: "a" }));

            expect(assertion).to.throw(buildExpectedEntityMessage("{ a: 'a' }"));
        });
        it("should throw an error when the argument does not match the expected", () => {
            const assertion = buildAssertion(buildEntity({ a: "a" }));

            stub(buildEntity({ a: "b" }));

            expect(assertion).to.throw(buildExpectedEqualEntitiesMessage());
        });

        function buildAssertion(object: any): () => void {
            return () => expect(stub).to.have.been.calledOnceWithEntity(object);
        }
    });

    function buildExpectedEntityMessage(objectString: string): string {
        return `expected ${objectString} to be an entity`;
    }
    function buildExpectedEqualEntitiesMessage(): string {
        return `expected entities to be equal`;
    }
});

function buildEntity<T extends object>(object: T): T & Entity {
    return {
        ...object,
        toJSON() {
            return object;
        }
    };
}
