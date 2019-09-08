import { entityGenerators, expect, generateIndex, monday, Stub } from "@test/unit";
import { TimeCard } from "../../domain";
import { MongoDbAdapter } from "../databases";
import { buildStubbedMongoDbAdapter } from "../test";
import { makeMongoTimeCardRepository, toDBModel } from "./mongoTimeCardRepository";

describe("mongoTimeCardRepository", () => {
    let stubbedDb: Stub<MongoDbAdapter<TimeCard>>;
    let repository: ReturnType<typeof makeMongoTimeCardRepository>;

    beforeEach(() => {
        stubbedDb = buildStubbedMongoDbAdapter();
        repository = makeMongoTimeCardRepository(stubbedDb);
    });

    describe("fetchAllOfEmployee", () => {
        it("should return all the employee's time cards", async () => {
            const employeeId = generateIndex();
            const timeCards = [entityGenerators.generateTimeCard(), entityGenerators.generateTimeCard()];
            stubbedDb.fetchAll.withArgs({ employeeId }).resolves(timeCards.map(toDBModel));

            const result = await repository.fetchAllOfEmployee(employeeId);

            expect(result).entities.to.equal(timeCards);
        });
    });
    describe("fetchAllOfEmployeeSince", () => {
        it("should return all the employee's made after the given date", async () => {
            const employeeId = generateIndex();
            const timeCards = [entityGenerators.generateTimeCard(), entityGenerators.generateTimeCard()];
            stubbedDb.fetchAll
                .withArgs({
                    employeeId,
                    date: { $gt: monday }
                })
                .resolves(timeCards.map(toDBModel));

            const result = await repository.fetchAllOfEmployeeSince(employeeId, monday);

            expect(result).entities.to.equal(timeCards);
        });
    });
    describe("insert", () => {
        it("insert the given time card", async () => {
            const timeCard = entityGenerators.generateTimeCard();
            stubbedDb.insert.resolves();

            await repository.insert(timeCard);

            expect(stubbedDb.insert).to.have.been.calledOnceWith(toDBModel(timeCard));
        });
    });
});
