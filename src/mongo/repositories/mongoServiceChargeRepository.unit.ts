import { expect, generateIndex, generateServiceCharge, Stub } from "@test/unit";
import { ServiceCharge } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";
import { buildStubbedMongoDbAdapter } from "../test";
import { makeMongoServiceChargeRepository } from "./mongoServiceChargeRepository";

describe("mongoServiceChargeRepository", () => {
    let stubbedDb: Stub<MongoDbAdapter<ServiceCharge>>;
    let repository: ReturnType<typeof makeMongoServiceChargeRepository>;

    beforeEach(() => {
        stubbedDb = buildStubbedMongoDbAdapter();
        repository = makeMongoServiceChargeRepository(stubbedDb);
    });

    describe("fetchAll", () => {
        it("should return all the service charges", async () => {
            const serviceCharges = [generateServiceCharge(), generateServiceCharge()];
            await stubbedDb.fetchAll.withArgs({}).resolves(serviceCharges);

            const result = await repository.fetchAll();

            expect(result).to.deep.equal(serviceCharges);
        });
    });
    describe("fetchAllOfMember", () => {
        it("should return all the employee's service charges", async () => {
            const memberId = `member-${generateIndex()}`;
            const serviceCharges = [generateServiceCharge(), generateServiceCharge()];
            await stubbedDb.fetchAll.withArgs({ memberId }).resolves(serviceCharges);

            const salesReceipts = await repository.fetchAllOfMember(memberId);

            expect(salesReceipts).to.deep.equal(serviceCharges);
        });
    });
    describe("insert", () => {
        it("insert the given service charge", async () => {
            const serviceCharge = generateServiceCharge();
            await stubbedDb.insert.resolves();

            await repository.insert(serviceCharge);

            expect(stubbedDb.insert).to.have.been.calledOnceWith(serviceCharge);
        });
    });
});
