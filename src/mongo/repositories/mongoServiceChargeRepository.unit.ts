import { buildStubMongoDbAdapter, expect, generateIndex, generateServiceCharge, Stub } from "@test/unit";
import { ServiceCharge, ServiceChargeRepository } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";
import { buildMongoServiceChargeRepository } from "./mongoServiceChargeRepository";

describe("mongoServiceChargeRepository", () => {
    let stubDb: Stub<MongoDbAdapter<ServiceCharge>>;
    let repository: ServiceChargeRepository;

    beforeEach(() => {
        stubDb = buildStubMongoDbAdapter();
        repository = buildMongoServiceChargeRepository(stubDb);
    });

    describe("fetchAll", () => {
        it("should return all the service charges", async () => {
            const serviceCharges = [generateServiceCharge(), generateServiceCharge()];
            await stubDb.fetchAll.withArgs({}).resolves(serviceCharges);

            const result = await repository.fetchAll();

            expect(result).to.deep.equal(serviceCharges);
        });
    });
    describe("fetchAllOfMember", () => {
        it("should return all the employee's service charges", async () => {
            const memberId = `member-${generateIndex()}`;
            const serviceCharges = [generateServiceCharge(), generateServiceCharge()];
            await stubDb.fetchAll.withArgs({ memberId }).resolves(serviceCharges);

            const salesReceipts = await repository.fetchAllOfMember(memberId);

            expect(salesReceipts).to.deep.equal(serviceCharges);
        });
    });
    describe("insert", () => {
        it("insert the given service charge", async () => {
            const serviceCharge = generateServiceCharge();
            await stubDb.insert.resolves();

            await repository.insert(serviceCharge);

            expect(stubDb.insert).to.have.been.calledOnceWith(serviceCharge);
        });
    });
});
