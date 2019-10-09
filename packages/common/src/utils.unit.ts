import { expect } from "@payroll/test";
import * as moment from "moment";
import { clean, isoDate, stripQuotationMarks } from "./utils";

describe("utils", () => {
    describe("stripQuotationMarks", () => {
        it("should strip quotation marks", () => {
            const result = stripQuotationMarks(`"text"`);
            expect(result).to.equal("text");
        });
        it("should strip quotation marks and trim the string", () => {
            const result = stripQuotationMarks(`  "text"  `);
            expect(result).to.equal("text");
        });
        it("should return the same string when there is no quotation marks", () => {
            const result = stripQuotationMarks("  text  ");
            expect(result).to.equal("  text  ");
        });
    });
    describe("clean", () => {
        it("should return the object when all is defined", () => {
            const result = clean({ a: "a", b: "b" });
            expect(result).to.deep.equal({ a: "a", b: "b" });
        });
        it("should remove undefined fields", () => {
            const result = clean({ a: "a", b: undefined });
            expect(result).to.deep.equal({ a: "a" });
        });
    });
    describe("isoDate", () => {
        it("should the iso date from a moment object", () => {
            const date = moment("2013-02-08 09:30:26");
            const result = isoDate(date);
            expect(result).to.equal("2013-02-08");
        });
        it("should the iso date from a date object", () => {
            const date = new Date("Sun Oct 06 2019 15:20:56 GMT+0200");
            const result = isoDate(date);
            expect(result).to.equal("2019-10-06");
        });
    });
});
