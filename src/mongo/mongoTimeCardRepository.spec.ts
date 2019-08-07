import { cloneDeep } from "lodash";
import { generateTimeCard } from "../../test/generators";
import "../../test/integrationTest";
import { expect } from "../../test/unitTest";
import { TimeCard } from "../core";
import { dbTimeCards } from "./db";
import { mongoTimeCardRepository } from "./mongoTimeCardRepository";

describe("mongoTimeCardRepository", () => {
    describe("fetchAllOfEmployee", () => {
        it("should return all the employee's time cards", async () => {
            const salesReceipt = await dbGenerateTimeCard();

            const salesReceipts = await mongoTimeCardRepository.fetchAllOfEmployee(
                salesReceipt.employeeId
            );

            expect(salesReceipts).to.deep.equal([salesReceipt]);
        });
        it("should not return other employees' time cards", async () => {
            const salesReceipt = await dbGenerateTimeCard();

            const salesReceipts = await mongoTimeCardRepository.fetchAllOfEmployee(
                salesReceipt.employeeId + 1
            );

            expect(salesReceipts).to.be.empty;
        });

        async function dbGenerateTimeCard(): Promise<TimeCard> {
            const timeCard = generateTimeCard();
            await dbTimeCards.insertOne(cloneDeep(timeCard));
            return timeCard;
        }
    });
    describe("insertOne", () => {
        it("insert the given time card", async () => {
            const timeCard = generateTimeCard();

            await mongoTimeCardRepository.insertOne(timeCard);

            const dbTimeCards = await mongoTimeCardRepository.fetchAllOfEmployee(
                timeCard.employeeId
            );
            expect(dbTimeCards).to.deep.equal([timeCard]);
        });
        it("should not add the _id field to the entity", async () => {
            const timeCard = generateTimeCard();

            await mongoTimeCardRepository.insertOne(timeCard);

            expect(timeCard).not.to.have.property("_id");
        });
    });
});
