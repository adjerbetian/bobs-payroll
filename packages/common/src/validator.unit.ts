import { expect } from "@bobs-payroll/test";
import { buildValidator, Validator } from "./validator";

describe("asserter", () => {
    let validator: Validator;

    beforeEach(() => {
        validator = buildValidator(() => new Error("test validation error"));
    });

    describe("assertIsNotEmpty", () => {
        it("should do nothing when the argument is defined", () => {
            validator.assertIsNotEmpty(0);
        });
        it("should throw when given en empty string", () => {
            expect(() => validator.assertIsNotEmpty("")).to.throw();
        });
        it("should throw when given something undefined", () => {
            expect(() => validator.assertIsNotEmpty()).to.throw();
        });
        it("should throw when given null", () => {
            expect(() => validator.assertIsNotEmpty(null)).to.throw();
        });
    });
    describe("assertIsISODate", () => {
        it("should do nothing when the date is correct", () => {
            validator.assertIsISODate("2019-12-01");
        });
        it("should throw when given a non valid date", () => {
            expect(() => validator.assertIsISODate("2019-13-01")).to.throw();
        });
        it("should throw when given a date in the wrong format", () => {
            expect(() => validator.assertIsISODate("01-01-2019")).to.throw();
        });
        it("should throw when given something else than a date", () => {
            expect(() => validator.assertIsISODate("a")).to.throw();
        });
    });
    describe("assertIsIncludedIn", () => {
        it("should do nothing when it is included", () => {
            validator.assertIsIncludedIn("a", ["a", "b"]);
        });
        it("should throw when given a non valid date", () => {
            expect(() => validator.assertIsIncludedIn("c", ["a", "b"])).to.throw();
        });
        it("should throw when given a date in the wrong format", () => {
            expect(() => validator.assertIsIncludedIn(undefined, ["a", "b"])).to.throw();
        });
    });
    describe("assertIsTrue", () => {
        it("should do nothing when it is true", () => {
            validator.assertIsTrue(true);
        });
        it("should throw when given a non valid date", () => {
            expect(() => validator.assertIsTrue(false)).to.throw();
        });
    });
    describe("assertEquals", () => {
        it("should do nothing when values are equal", () => {
            validator.assertEquals("a", "a");
            validator.assertEquals(10, 10);
            validator.assertEquals(null, null);
        });
        it("should throw when values are not equal", () => {
            expect(() => validator.assertEquals("a", "b")).to.throw();
            expect(() => validator.assertEquals(10, 11)).to.throw();
            expect(() => validator.assertEquals(null, 10)).to.throw();
            expect(() => validator.assertEquals(null, undefined)).to.throw();
        });
        it("should throw when given undefined", () => {
            expect(() => validator.assertEquals(undefined, undefined)).to.throw();
        });
    });
});
