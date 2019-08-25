import { generateTimeCard } from "../../test/generators";
import "../../test/integrationTest";
import { expect } from "../../test/unitTest";
import { generateIndex } from "../../test/utils";
import { mongoTimeCardRepository as repository } from "./mongoTimeCardRepository";
import { dbTimeCards as db } from "./db";

describe("mongoTimeCardRepository", () => {
    describe("fetchAllOfEmployee", () => {
        let employeeId: number;

        beforeEach(() => {
            employeeId = generateIndex();
        });

        it("should return all the employee's time cards", async () => {
            const timeCard1 = generateTimeCard({ employeeId });
            const timeCard2 = generateTimeCard({ employeeId });
            await db.insert(timeCard1);
            await db.insert(timeCard2);

            const dbTimeCards = await repository.fetchAllOfEmployee(employeeId);

            expect(dbTimeCards).to.deep.equal([timeCard1, timeCard2]);
        });
        it("should not return other employees' time cards", async () => {
            const timeCard = generateTimeCard({ employeeId });
            await db.insert(timeCard);

            const dbTimeCards = await repository.fetchAllOfEmployee(timeCard.employeeId + 1);

            expect(dbTimeCards).to.be.empty;
        });
    });
    describe("insert", () => {
        it("insert the given time card", async () => {
            const timeCard = generateTimeCard();

            await repository.insert(timeCard);

            const dbTimeCard = await db.fetch({ employeeId: timeCard.employeeId });
            expect(dbTimeCard).to.deep.equal(timeCard);
        });
        it("should not add the _id field to the entity", async () => {
            const timeCard = generateTimeCard();

            await repository.insert(timeCard);

            expect(timeCard).not.to.have.property("_id");
        });
    });
});
