import { expect } from "@infra/test";
import { generators } from "../../test";
import { TimeCard } from "./TimeCard";

describe("entity TimeCard", () => {
    let timeCard: TimeCard;

    describe("getRegularHours", () => {
        it("should return the normal hours when under 8", () => {
            timeCard = generators.generateTimeCard({ hours: 4 });

            const result = timeCard.getRegularHours();

            expect(result).to.equal(4);
        });
        it("should return the cap the hours to 8 when it is above", () => {
            timeCard = generators.generateTimeCard({ hours: 10 });

            const result = timeCard.getRegularHours();

            expect(result).to.equal(8);
        });
    });
    describe("getExtraHours", () => {
        it("should return 0 when it has only regular hours", () => {
            timeCard = generators.generateTimeCard({ hours: 4 });

            const result = timeCard.getExtraHours();

            expect(result).to.equal(0);
        });
        it("should return the cap the hours to 8 when it is above", () => {
            timeCard = generators.generateTimeCard({ hours: 10 });

            const result = timeCard.getExtraHours();

            expect(result).to.equal(2);
        });
    });
});
