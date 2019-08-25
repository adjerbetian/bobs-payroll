import { buildFakeMongoDbAdapter, Fake } from "../../../test/fakeBuilders";
import { generateServiceCharge } from "../../../test/generators";
import { expect } from "../../../test/unitTest";
import { generateIndex } from "../../../test/utils";
import { ServiceCharge, ServiceChargeRepository } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";
import { buildMongoServiceChargeRepository } from "./mongoServiceChargeRepository";

describe("mongoServiceChargeRepository", () => {
    let fakeDb: Fake<MongoDbAdapter<ServiceCharge>>;
    let repository: ServiceChargeRepository;

    beforeEach(() => {
        fakeDb = buildFakeMongoDbAdapter();
        repository = buildMongoServiceChargeRepository(fakeDb);
    });

    describe("fetchAll", () => {
        it("should return all the service charges", async () => {
            const serviceCharges = [generateServiceCharge(), generateServiceCharge()];
            await fakeDb.fetchAll.withArgs({}).resolves(serviceCharges);

            const result = await repository.fetchAll();

            expect(result).to.deep.equal(serviceCharges);
        });
    });
    describe("fetchAllOfMember", () => {
        it("should return all the employee's service charges", async () => {
            const memberId = `member-${generateIndex()}`;
            const serviceCharges = [generateServiceCharge(), generateServiceCharge()];
            await fakeDb.fetchAll.withArgs({ memberId }).resolves(serviceCharges);

            const salesReceipts = await repository.fetchAllOfMember(memberId);

            expect(salesReceipts).to.deep.equal(serviceCharges);
        });
    });
    describe("insert", () => {
        it("insert the given service charge", async () => {
            const serviceCharge = generateServiceCharge();
            await fakeDb.insert.resolves();

            await repository.insert(serviceCharge);

            expect(fakeDb.insert).to.have.been.calledOnceWith(serviceCharge);
        });
    });
});
