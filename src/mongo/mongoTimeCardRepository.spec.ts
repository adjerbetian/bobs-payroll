import { generateTimeCard } from "../../test/generators";
import "../../test/integrationTest";
import { seedTimeCard } from "../../test/seeders";
import { expect } from "../../test/unitTest";
import { mongoTimeCardRepository } from "./mongoTimeCardRepository";

describe("mongoTimeCardRepository", () => {
    describe("fetchAllOfEmployee", () => {
        it("should return all the employee's time cards", async () => {
            const salesReceipt = await seedTimeCard();

            const salesReceipts = await mongoTimeCardRepository.fetchAllOfEmployee(salesReceipt.employeeId);

            expect(salesReceipts).to.deep.equal([salesReceipt]);
        });
        it("should not return other employees' time cards", async () => {
            const salesReceipt = await seedTimeCard();

            const salesReceipts = await mongoTimeCardRepository.fetchAllOfEmployee(salesReceipt.employeeId + 1);

            expect(salesReceipts).to.be.empty;
        });
    });
    describe("insert", () => {
        it("insert the given time card", async () => {
            const timeCard = generateTimeCard();

            await mongoTimeCardRepository.insert(timeCard);

            const dbTimeCards = await mongoTimeCardRepository.fetchAllOfEmployee(timeCard.employeeId);
            expect(dbTimeCards).to.deep.equal([timeCard]);
        });
        it("should not add the _id field to the entity", async () => {
            const timeCard = generateTimeCard();

            await mongoTimeCardRepository.insert(timeCard);

            expect(timeCard).not.to.have.property("_id");
        });
    });
});
