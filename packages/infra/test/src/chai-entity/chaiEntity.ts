/* eslint-disable */
import AssertionStatic = Chai.AssertionStatic;
import ChaiStatic = Chai.ChaiStatic;
import ChaiUtils = Chai.ChaiUtils;

declare global {
    export namespace Chai {
        // noinspection JSUnusedGlobalSymbols
        interface Assertion {
            entity: Assertion;
            entities: Assertion;
            calledOnceWithEntity(...args: any[]): Assertion;
        }
    }
}

export function chaiEntity(chai: ChaiStatic, utils: ChaiUtils): void {
    addProperty("entity");
    addProperty("entities");
    overrideMethodEqual();
    overrideMethodInclude();
    addMethodCalledOnceWithEntity();

    function addProperty(property: string) {
        utils.addProperty(chai.Assertion.prototype, property, function() {
            utils.flag(this, property, true);
        });
    }

    function overrideMethodEqual() {
        chai.Assertion.overwriteMethod("equal", equalMethod);

        function equalMethod(_super: AssertionStatic) {
            return function(expected: any) {
                const entityAsserts = makeEntityAsserts(this);

                if (utils.flag(this, "entity")) {
                    entityAsserts.assertEntitiesAreEqual(this._obj, expected);
                } else if (utils.flag(this, "entities")) {
                    entityAsserts.assertEntityArraysAreEqual(this._obj, expected);
                } else {
                    return _super.apply(this, arguments);
                }
            };
        }
    }

    function overrideMethodInclude() {
        //todo: make a PR to @types/chai to fix this problem
        // @ts-ignore
        chai.Assertion.overwriteChainableMethod("include", includeMethod, _super => _super);

        function includeMethod(_super: AssertionStatic) {
            return function(expected: any) {
                const entityAsserts = makeEntityAsserts(this);

                if (utils.flag(this, "entities")) {
                    entityAsserts.assertEntityArrayIncludesEntity(this._obj, expected);
                } else {
                    return _super.apply(this, arguments);
                }
            };
        }
    }

    function addMethodCalledOnceWithEntity() {
        chai.Assertion.addMethod("calledOnceWithEntity", calledOnceWithEntityMethod);

        function calledOnceWithEntityMethod(expected: any) {
            const entityAsserts = makeEntityAsserts(this);

            new chai.Assertion(this._obj).to.have.been.calledOnce;
            const calledArg = this._obj.getCall(0).args[0];
            entityAsserts.assertEntitiesAreEqual(calledArg, expected);
        }
    }

    function makeEntityAsserts(that: any) {
        return {
            assertEntityArrayIncludesEntity: assertEntityArrayIncludesEntity.bind(that),
            assertEntityArraysAreEqual: assertEntityArraysAreEqual.bind(that),
            assertEntitiesAreEqual: assertEntitiesAreEqual.bind(that)
        };

        function assertEntityArrayIncludesEntity(entities: any[], entity: any) {
            new chai.Assertion(entities).to.be.an("array");
            assertIsEntityArray(entities);
            assertIsEntity(entity);

            const jsonArray = entities.map(e => e.toJSON());
            const assertion = new chai.Assertion(jsonArray);
            utils.transferFlags(this, assertion, false);
            utils.flag(assertion, "entities", false);
            assertion.to.deep.include(entity.toJSON());
        }

        function assertEntityArraysAreEqual(entities1: any[], entities2: any[]) {
            new chai.Assertion(entities1).to.be.an("array");
            new chai.Assertion(entities2).to.be.an("array");
            assertIsEntityArray(entities1);
            assertIsEntityArray(entities2);
            new chai.Assertion(entities1.map(e => e.toJSON())).to.deep.equal(entities2.map(e => e.toJSON()));
        }
        function assertEntitiesAreEqual(entity1: any, entity2: any): void {
            assertIsEntity(entity1);
            assertIsEntity(entity2);
            chaiAssert(entity1, {
                assertion: areObjectsDeepEqual(entity1, entity2),
                message: "expected entities to be equal",
                negatedMessage: "expected entities not to be equal",
                actual: entity1.toJSON(),
                expected: entity2.toJSON()
            });
        }
        function assertIsEntityArray(objects: any[]): void {
            chaiAssert(objects, {
                assertion: objects.every(object => isEntity(object)),
                message: "expected #{this} to be an array of entities"
            });
        }
        function assertIsEntity(object: any): void {
            chaiAssert(object, { assertion: isEntity(object), message: "expected #{this} to be an entity" });
        }
        function isEntity(object: any) {
            return object.toJSON && typeof object.toJSON === "function";
        }
        function areObjectsDeepEqual(object1: any, object2: any): boolean {
            try {
                new chai.Assertion(object1.toJSON()).to.deep.equal(object2.toJSON());
                return true;
            } catch (e) {
                return false;
            }
        }
        function chaiAssert(
            object: any,
            params: {
                assertion: boolean;
                message: string;
                negatedMessage?: string;
                actual?: any;
                expected?: any;
            }
        ) {
            (new chai.Assertion(object) as any).assert(
                params.assertion,
                params.message,
                params.negatedMessage,
                params.expected,
                params.actual,
                typeof params.actual !== "undefined" && typeof params.expected !== "undefined"
            );
        }
    }
}
