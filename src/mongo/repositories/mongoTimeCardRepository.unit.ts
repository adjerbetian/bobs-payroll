import { expect, generateIndex, generateTimeCard, monday, Stub } from "@test/unit";
import { TimeCard } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";
import { buildStubbedMongoDbAdapter } from "../test";
import { buildMongoTimeCardRepository } from "./mongoTimeCardRepository";

describe("mongoTimeCardRepository", () => {
    let stubbedDb: Stub<MongoDbAdapter<TimeCard>>;
    let repository: ReturnType<typeof buildMongoTimeCardRepository>;

    beforeEach(() => {
        stubbedDb = buildStubbedMongoDbAdapter();
        repository = buildMongoTimeCardRepository(stubbedDb);
    });

    describe("fetchAllOfEmployee", () => {
        it("should return all the employee's time cards", async () => {
            const employeeId = generateIndex();
            const timeCards = [generateTimeCard(), generateTimeCard()];
            stubbedDb.fetchAll.withArgs({ employeeId }).resolves(timeCards);

            const result = await repository.fetchAllOfEmployee(employeeId);

            expect(result).to.deep.equal(timeCards);
        });
    });
    describe("fetchAllOfEmployeeSince", () => {
        it("should return all the employee's made after the given date", async () => {
            const employeeId = generateIndex();
            const timeCards = [generateTimeCard(), generateTimeCard()];
            stubbedDb.fetchAll
                .withArgs({
                    employeeId,
                    date: { $gt: monday }
                })
                .resolves(timeCards);

            const result = await repository.fetchAllOfEmployeeSince(employeeId, monday);

            expect(result).to.deep.equal(timeCards);
        });
    });
    describe("insert", () => {
        it("insert the given time card", async () => {
            const timeCard = generateTimeCard();
            stubbedDb.insert.resolves();

            await repository.insert(timeCard);

            expect(stubbedDb.insert).to.have.been.calledOnceWith(timeCard);
        });
    });
});
