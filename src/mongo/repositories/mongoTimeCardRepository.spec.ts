import {
    entityGenerators,
    entitySeeders,
    expect,
    generateIndex,
    lastTuesday,
    monday,
    never,
    tuesday
} from "@test/integration";
import { dbTimeCards } from "../databases";
import { makeMongoTimeCardRepository } from "./mongoTimeCardRepository";

describe("mongoTimeCardRepository", () => {
    let repository: ReturnType<typeof makeMongoTimeCardRepository>;
    let employeeId: number;

    beforeEach(() => {
        repository = makeMongoTimeCardRepository(dbTimeCards);
        employeeId = generateIndex();
    });

    describe("fetchAllOfEmployee", () => {
        it("should return all the employee's time cards", async () => {
            const timeCards = [
                await entitySeeders.seedTimeCard({ employeeId }),
                await entitySeeders.seedTimeCard({ employeeId })
            ];

            const result = await repository.fetchAllOfEmployee(employeeId);

            expect(result).entities.to.equal(timeCards);
        });
        it("should not return the time cards from the other employees", async () => {
            await entitySeeders.seedTimeCard();

            const result = await repository.fetchAllOfEmployee(employeeId);

            expect(result).to.be.empty;
        });
    });
    describe("fetchAllOfEmployeeSince", () => {
        it("should return all the employee's made after the given date", async () => {
            const timeCards = [
                await entitySeeders.seedTimeCard({ employeeId }),
                await entitySeeders.seedTimeCard({ employeeId })
            ];

            const result = await repository.fetchAllOfEmployeeSince(employeeId, never);

            expect(result).entities.to.equal(timeCards);
        });
        it("should not return the time cards from the other employees", async () => {
            await entitySeeders.seedTimeCard();

            const result = await repository.fetchAllOfEmployeeSince(employeeId, never);

            expect(result).to.be.empty;
        });
        it("should return the time cards made after the given date", async () => {
            await entitySeeders.seedTimeCard({ employeeId, date: tuesday });
            await entitySeeders.seedTimeCard({ employeeId, date: lastTuesday });

            const result = await repository.fetchAllOfEmployeeSince(employeeId, monday);

            expect(result).to.have.lengthOf(1);
            expect(result[0].getDate()).to.equal(tuesday);
        });
    });
    describe("insert", () => {
        it("should insert the given time card", async () => {
            const timeCard = entityGenerators.generateTimeCard({ employeeId });

            await repository.insert(timeCard);

            const insertedTimeCards = await repository.fetchAllOfEmployee(employeeId);
            expect(insertedTimeCards).entities.to.equal([timeCard]);
        });
    });
});
