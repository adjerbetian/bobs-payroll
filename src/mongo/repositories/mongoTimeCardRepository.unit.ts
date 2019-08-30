import { monday } from "../../../test/dates";
import { buildFakeMongoDbAdapter, Fake } from "../../../test/fakeBuilders";
import { generateIndex, generateTimeCard } from "../../../test/generators";
import { expect } from "../../../test/unitTest";
import { TimeCard, TimeCardRepository } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";
import { buildMongoTimeCardRepository } from "./mongoTimeCardRepository";

describe("mongoTimeCardRepository", () => {
    let fakeDb: Fake<MongoDbAdapter<TimeCard>>;
    let repository: TimeCardRepository;

    beforeEach(() => {
        fakeDb = buildFakeMongoDbAdapter();
        repository = buildMongoTimeCardRepository(fakeDb);
    });

    describe("fetchAllOfEmployee", () => {
        it("should return all the employee's time cards", async () => {
            const employeeId = generateIndex();
            const timeCards = [generateTimeCard(), generateTimeCard()];
            fakeDb.fetchAll.withArgs({ employeeId }).resolves(timeCards);

            const result = await repository.fetchAllOfEmployee(employeeId);

            expect(result).to.deep.equal(timeCards);
        });
    });
    describe("fetchAllOfEmployeeSince", () => {
        it("should return all the employee's made after the given date", async () => {
            const employeeId = generateIndex();
            const timeCards = [generateTimeCard(), generateTimeCard()];
            fakeDb.fetchAll
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
            fakeDb.insert.resolves();

            await repository.insert(timeCard);

            expect(fakeDb.insert).to.have.been.calledOnceWith(timeCard);
        });
    });
});
