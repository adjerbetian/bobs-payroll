/* eslint-disable */
declare global {
    export namespace Chai {
        // noinspection JSUnusedGlobalSymbols
        interface Assertion {
            entity: Assertion;
            calledOnceWithEntity(...args: any[]): Assertion;
        }
    }
}

export function chaiEntity(chai: Chai.ChaiStatic, utils: Chai.ChaiUtils): void {
    utils.addProperty(chai.Assertion.prototype, "entity", function() {
        utils.flag(this, "entity", true);
    });

    chai.Assertion.overwriteMethod("equal", function(_super) {
        return function(expected: any) {
            if (utils.flag(this, "entity")) {
                assertEntitiesAreEqual(this._obj, expected);
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

    function assertEntitiesAreEqual(entity1: any, entity2: any): void {
        assertIsEntity(entity1);
        assertIsEntity(entity2);
        (new chai.Assertion(entity1) as any).assert(
            areObjectsDeepEqual(entity1, entity2),
            "expected entities to be equal",
            "expected entities not to be equal",
            entity1.toJSON(),
            entity2.toJSON(),
            true
        );
    }
    function assertIsEntity(object: any): void {
        (new chai.Assertion(object) as any).assert(
            object.toJSON && typeof object.toJSON === "function",
            "expected #{this} be an entity"
        );
    }
    function areObjectsDeepEqual(object1: any, object2: any): boolean {
        try {
            new chai.Assertion(object1.toJSON()).to.deep.equal(object2.toJSON());
            return true;
        } catch (e) {
            return false;
        }
    }
}
