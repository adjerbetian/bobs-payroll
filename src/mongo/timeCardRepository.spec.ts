import "../../test/integrationTest";
import { expect } from "../../test/unitTest";
import { generateTimeCard } from "../../test/generators";
import { timeCardRepository } from "./timeCardRepository";

describe("timeCardRepository", () => {
    describe("insertOne", () => {
        it("insert the given employee", async () => {
            const timeCard = generateTimeCard();

            await timeCardRepository.insertOne(timeCard);

            const dbTimeCards = await timeCardRepository.fetchAllOfEmployee(timeCard.employeeId);
            expect(dbTimeCards).to.deep.equal([timeCard]);
        });
        it("should not add the _id field to the entity", async () => {
            const timeCard = generateTimeCard();

            await timeCardRepository.insertOne(timeCard);

            expect(timeCard).not.to.have.property("_id");
        });
    });
});
