import { expect } from "@test/unit";
import { stripQuotationMarks } from "./strings";

describe("string utils", () => {
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
});
