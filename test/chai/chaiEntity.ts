/* eslint-disable */
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

export function chaiEntity(chai: Chai.ChaiStatic, utils: Chai.ChaiUtils): void {
    utils.addProperty(chai.Assertion.prototype, "entity", function() {
        utils.flag(this, "entity", true);
    });
    utils.addProperty(chai.Assertion.prototype, "entities", function() {
        utils.flag(this, "entities", true);
    });

    chai.Assertion.overwriteMethod("equal", function(_super) {
        return function(expected: any) {
            if (utils.flag(this, "entity")) {
                assertEntitiesAreEqual(this._obj, expected);
            } else if (utils.flag(this, "entities")) {
                assertEntityArraysAreEqual(this._obj, expected);
            } else {
                return _super.apply(this, arguments);
            }
        };
    });
    chai.Assertion.addMethod("calledOnceWithEntity", function(expected: any) {
        new chai.Assertion(this._obj).to.have.been.calledOnce;
        const calledArg = this._obj.getCall(0).args[0];
        assertEntitiesAreEqual(calledArg, expected);
    });

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
