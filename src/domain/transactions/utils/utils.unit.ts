import { expect } from "../../../../test/unitTest";
import { stripQuotationMarks } from "./utils";

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
});
