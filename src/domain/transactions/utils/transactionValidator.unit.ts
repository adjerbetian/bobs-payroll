import { expect } from "../../../../test/unitTest";
import { buildTransactionValidator, TransactionValidator } from "./transactionValidator";

describe("asserter", () => {
    let asserter: TransactionValidator;

    beforeEach(() => {
        asserter = buildTransactionValidator("MyTransaction");
    });

    describe("assertIsNotEmpty", () => {
        it("should do nothing when the argument is defined", () => {
            asserter.assertIsNotEmpty(0);
        });
        it("should throw when given en empty string", () => {
            expect(() => asserter.assertIsNotEmpty("")).to.throw();
        });
        it("should throw when given something undefined", () => {
            expect(() => asserter.assertIsNotEmpty()).to.throw();
        });
        it("should throw when given null", () => {
            expect(() => asserter.assertIsNotEmpty(null)).to.throw();
        });
    });
    describe("assertIsISODate", () => {
        it("should do nothing when the date is correct", () => {
            asserter.assertIsISODate("2019-12-01");
        });
        it("should throw when given a non valid date", () => {
            expect(() => asserter.assertIsISODate("2019-13-01")).to.throw();
        });
        it("should throw when given a date in the wrong format", () => {
            expect(() => asserter.assertIsISODate("01-01-2019")).to.throw();
        });
        it("should throw when given something else than a date", () => {
            expect(() => asserter.assertIsISODate("a")).to.throw();
        });
    });
    describe("assertIsIncludedIn", () => {
        it("should do nothing when it is included", () => {
            asserter.assertIsIncludedIn("a", ["a", "b"]);
        });
        it("should throw when given a non valid date", () => {
            expect(() => asserter.assertIsIncludedIn("c", ["a", "b"])).to.throw();
        });
        it("should throw when given a date in the wrong format", () => {
            expect(() => asserter.assertIsIncludedIn(undefined, ["a", "b"])).to.throw();
        });
    });
    describe("assertIsTrue", () => {
        it("should do nothing when it is true", () => {
            asserter.assertIsTrue(true);
        });
        it("should throw when given a non valid date", () => {
            expect(() => asserter.assertIsTrue(false)).to.throw();
        });
    });
    describe("assertEquals", () => {
        it("should do nothing when values are equal", () => {
            asserter.assertEquals("a", "a");
            asserter.assertEquals(10, 10);
            asserter.assertEquals(null, null);
        });
        it("should throw when values are not equal", () => {
            expect(() => asserter.assertEquals("a", "b")).to.throw();
            expect(() => asserter.assertEquals(10, 11)).to.throw();
            expect(() => asserter.assertEquals(null, 10)).to.throw();
            expect(() => asserter.assertEquals(null, undefined)).to.throw();
        });
        it("should throw when given undefined", () => {
            expect(() => asserter.assertEquals(undefined, undefined)).to.throw();
        });
    });
});
