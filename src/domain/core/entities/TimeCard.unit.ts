import { expect } from "@test/unit";
import { generateTimeCard } from "@test/utils";
import { TimeCard } from "./TimeCard";

describe("entity TimeCard", () => {
    let timeCard: TimeCard;

    describe("getRegularHours", () => {
        it("should return the normal hours when under 8", () => {
            timeCard = generateTimeCard({ hours: 4 });

            const result = timeCard.getRegularHours();

            expect(result).to.equal(4);
        });
        it("should return the cap the hours to 8 when it is above", () => {
            timeCard = generateTimeCard({ hours: 10 });

            const result = timeCard.getRegularHours();

            expect(result).to.equal(8);
        });
    });
    describe("getExtraHours", () => {
        it("should return 0 when it has only regular hours", () => {
            timeCard = generateTimeCard({ hours: 4 });

            const result = timeCard.getExtraHours();

            expect(result).to.equal(0);
        });
        it("should return the cap the hours to 8 when it is above", () => {
            timeCard = generateTimeCard({ hours: 10 });

            const result = timeCard.getExtraHours();

            expect(result).to.equal(2);
        });
    });
});
