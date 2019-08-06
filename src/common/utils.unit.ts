import { expect } from "../../test/unitTest";
import {
    assertIsIncludedIn,
    assertIsISODate,
    assertIsNotEmpty,
    stripQuotationMarks
} from "./utils";

describe("utils", () => {
    describe("stripQuotationMarks", () => {
        it("should strip quotation marks", () => {
            const result = stripQuotationMarks(`"coucou"`);
            expect(result).to.equal("coucou");
        });
        it("should strip quotation marks and trim the string", () => {
            const result = stripQuotationMarks(`  "coucou"  `);
            expect(result).to.equal("coucou");
        });
        it("should return the same string when there is no quotation marks", () => {
            const result = stripQuotationMarks("  coucou  ");
            expect(result).to.equal("  coucou  ");
        });
    });
    describe("assertIsNotEmpty", () => {
        it("should do nothing when the argument is defined", () => {
            assertIsNotEmpty(0);
        });
        it("should throw when given en empty string", () => {
            expect(() => assertIsNotEmpty("")).to.throw();
        });
        it("should throw when given something undefined", () => {
            expect(() => assertIsNotEmpty()).to.throw();
        });
        it("should throw when given null", () => {
            expect(() => assertIsNotEmpty(null)).to.throw();
        });
    });
    describe("assertIsISODate", () => {
        it("should do nothing when the date is correct", () => {
            assertIsISODate("2019-12-01");
        });
        it("should throw when given a non valid date", () => {
            expect(() => assertIsISODate("2019-13-01")).to.throw();
        });
        it("should throw when given a date in the wrong format", () => {
            expect(() => assertIsISODate("01-01-2019")).to.throw();
        });
        it("should throw when given something else than a date", () => {
            expect(() => assertIsISODate("a")).to.throw();
        });
    });
    describe("assertIsIncludedIn", () => {
        it("should do nothing when it is included", () => {
            assertIsIncludedIn("a", ["a", "b"]);
        });
        it("should throw when given a non valid date", () => {
            expect(() => assertIsIncludedIn("c", ["a", "b"])).to.throw();
        });
        it("should throw when given a date in the wrong format", () => {
            expect(() => assertIsIncludedIn(undefined, ["a", "b"])).to.throw();
        });
    });
});
