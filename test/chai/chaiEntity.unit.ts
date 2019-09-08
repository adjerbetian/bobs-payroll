import { expect, sandbox } from "@test/unit";
import { SinonStub } from "sinon";

describe("chaiEntity", () => {
    describe("entity", function() {
        it("should work when both objects have a JSON method", () => {
            const assertion = buildAssertion(buildEntity({ a: "a" }), buildEntity({ a: "a" }));
            expect(assertion).not.to.throw();
        });
        it("should throw when the first object is not an entity", () => {
            const assertion = buildAssertion({ a: "a" }, buildEntity({ a: "a" }));
            expect(assertion).to.throw(buildExpectedEntityMessage("{ a: 'a' }"));
        });
        it("should throw when the second object is not an entity", () => {
            const assertion = buildAssertion(buildEntity({ a: "a" }), { a: "a" });
            expect(assertion).to.throw(buildExpectedEntityMessage("{ a: 'a' }"));
        });
        it("should throw when the objects don't match", () => {
            const assertion = buildAssertion(buildEntity({ a: "a" }), buildEntity({ a: "b" }));
            expect(assertion).to.throw(buildExpectedEqualEntitiesMessage());
        });

        function buildAssertion(object1: any, object2: any): () => void {
            return () => expect(object1).entity.to.equal(object2);
        }
    });
    describe("entities", function() {
        it("should work when both array have same entities", () => {
            const assertion = buildAssertion(
                [buildEntity({ a: "a" }), buildEntity({ b: "b" })],
                [buildEntity({ a: "a" }), buildEntity({ b: "b" })]
            );
            expect(assertion).not.to.throw();
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
        it("should throw when the objects don't match", () => {
            const assertion = buildAssertion(
                [buildEntity({ a: "a" }), buildEntity({ b: "b" })],
                [buildEntity({ a: "a" }), buildEntity({ b: "a" })]
            );
            expect(assertion).to.throw(
                `expected [ { a: 'a' }, { b: 'b' } ] to deeply equal [ { a: 'a' }, { b: 'a' } ]`
            );
        });

        function buildAssertion(objects1: any[], objects2: any[]): () => void {
            return () => expect(objects1).entities.to.equal(objects2);
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

function buildEntity<T extends object>(object: T): T & { toJSON(): T } {
    return {
        ...object,
        toJSON() {
            return object;
        }
    };
}
