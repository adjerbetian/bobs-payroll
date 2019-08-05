import "../../test/integrationTest";
import { expect } from "../../test/unitTest";
import { generateTimeCard } from "../../test/generators";
import { timeCardRepository } from "./timeCardRepository";
import { TimeCard } from "../entities";
import { dbTimeCards } from "./db";
import * as _ from "lodash";

describe("timeCardRepository", () => {
    describe("fetchAllOfEmployee", () => {
        it("should return all the employee's time cards", async () => {
            const salesReceipt = await dbGenerateTimeCard();

            const salesReceipts = await timeCardRepository.fetchAllOfEmployee(
                salesReceipt.employeeId
            );

            expect(salesReceipts).to.deep.equal([salesReceipt]);
        });
        it("should not return other employees' time cards", async () => {
            const salesReceipt = await dbGenerateTimeCard();

            const salesReceipts = await timeCardRepository.fetchAllOfEmployee(
                salesReceipt.employeeId + 1
            );

            expect(salesReceipts).to.be.empty;
        });

        async function dbGenerateTimeCard(): Promise<TimeCard> {
            const timeCard = generateTimeCard();
            await dbTimeCards.insertOne(_.cloneDeep(timeCard));
            return timeCard;
        }
    });
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
