import { entityGenerators, entitySeeders, expect, generateIndex } from "@test/integration";
import { dbServiceCharges } from "../databases";
import { makeMongoServiceChargeRepository } from "./mongoServiceChargeRepository";

describe("mongoServiceChargeRepository", () => {
    let repository: ReturnType<typeof makeMongoServiceChargeRepository>;

    beforeEach(() => {
        repository = makeMongoServiceChargeRepository(dbServiceCharges);
    });

    describe("fetchAll", () => {
        it("should return all the service charges", async () => {
            const serviceCharges = [await entitySeeders.seedServiceCharge(), await entitySeeders.seedServiceCharge()];

            const result = await repository.fetchAll();

            expect(result).entities.to.deep.equal(serviceCharges);
        });
    });
    describe("fetchAllOfMember", () => {
        it("should return all the employee's service charges", async () => {
            const memberId = `member-id-${generateIndex()}`;
            const serviceCharges = [
                await entitySeeders.seedServiceCharge({ memberId }),
                await entitySeeders.seedServiceCharge({ memberId })
            ];

            const result = await repository.fetchAllOfMember(memberId);

            expect(result).entities.to.deep.equal(serviceCharges);
        });
        it("should not return service charges from other employees", async () => {
            await entitySeeders.seedServiceCharge();

            const serviceCharges = await repository.fetchAllOfMember(`non-existent-member-id`);

            expect(serviceCharges).to.be.empty;
        });
    });
    describe("insert", () => {
        it("should insert the given service charge", async () => {
            const serviceCharge = entityGenerators.generateServiceCharge();

            await repository.insert(serviceCharge);

            const insertedTimeCards = await repository.fetchAll();
            expect(insertedTimeCards).entities.to.equal([serviceCharge]);
        });
    });
});
