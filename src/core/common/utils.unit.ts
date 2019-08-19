import { expect } from "../../../test/unitTest";
import { stripQuotationMarks } from "./utils";

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
});
