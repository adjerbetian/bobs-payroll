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
        new chai.Assertion(this._obj).to.respondTo("equals");
    });

    chai.Assertion.overwriteMethod("equal", function(_super) {
        return function(expected: any) {
            if (!utils.flag(this, "entity")) {
                return _super.apply(this, arguments);
            }

            new chai.Assertion(expected).to.respondTo("equals");
            (new chai.Assertion(this._obj) as any).assert(
                this._obj.equals(expected),
                "expected entities be be equal",
                "expected entities not to be equal",
                expected.toJSON(),
                this._obj.toJSON(),
                true
            );
        };
    });
    chai.Assertion.addMethod("calledOnceWithEntity", function(expected: any) {
        new chai.Assertion(this._obj).to.have.been.calledOnce;
        const calledArg = this._obj.getCall(0).args[0];
        new chai.Assertion(calledArg).entity.to.equal(expected);
    });
}
