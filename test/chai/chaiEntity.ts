declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    export namespace Chai {
        interface Assertion {
            entity: Assertion;
        }
    }
}

export function chaiEntity(chai: Chai.ChaiStatic, utils: Chai.ChaiUtils): void {
    utils.addProperty(chai.Assertion.prototype, "entity", function() {
        utils.flag(this, "entity", true);
        new chai.Assertion(this._obj).to.respondTo("toJSON");
    });

    chai.Assertion.overwriteMethod("equal", function(_super) {
        return function entityEqual(expected: any) {
            if (!utils.flag(this, "entity") || !utils.flag(this, "deep")) {
                // eslint-disable-next-line prefer-rest-params
                return _super.apply(this, arguments);
            }

            new chai.Assertion(expected).to.respondTo("toJSON");
            new chai.Assertion(this._obj.toJSON()).to.deep.equal(expected.toJSON());
        };
    });
}
