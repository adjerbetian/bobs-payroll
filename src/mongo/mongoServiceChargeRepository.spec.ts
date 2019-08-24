import { cloneDeep } from "lodash";
import { generateServiceCharge } from "../../test/generators";
import "../../test/integrationTest";
import { expect } from "../../test/unitTest";
import { ServiceCharge } from "../domain";
import { dbServiceCharge } from "./db";
import { mongoServiceChargeRepository } from "./mongoServiceChargeRepository";

describe("mongoServiceChargeRepository", () => {
    describe("fetchAll", () => {
        it("should return all the service charges", async () => {
            const serviceCharges = [await dbGenerateServiceCharge(), await dbGenerateServiceCharge()];

            const dbServiceCharges = await mongoServiceChargeRepository.fetchAll();

            expect(dbServiceCharges).to.deep.equal(serviceCharges);
        });
    });
    describe("fetchAllOfMember", () => {
        it("should return all the employee's service charges", async () => {
            const serviceCharge = await dbGenerateServiceCharge();

            const salesReceipts = await mongoServiceChargeRepository.fetchAllOfMember(serviceCharge.memberId);

            expect(salesReceipts).to.deep.equal([serviceCharge]);
        });
        it("should not return other employees' time cards", async () => {
            const serviceCharge = await dbGenerateServiceCharge();

            const salesReceipts = await mongoServiceChargeRepository.fetchAllOfMember(serviceCharge.memberId + "x");

            expect(salesReceipts).to.be.empty;
        });
    });
    describe("insertOne", () => {
        it("insert the given service charge", async () => {
            const serviceCharge = generateServiceCharge();

            await mongoServiceChargeRepository.insertOne(serviceCharge);

            const dbServiceCharges = await mongoServiceChargeRepository.fetchAllOfMember(serviceCharge.memberId);
            expect(dbServiceCharges).to.deep.equal([serviceCharge]);
        });
        it("should not add the _id field to the entity", async () => {
            const serviceCharge = generateServiceCharge();

            await mongoServiceChargeRepository.insertOne(serviceCharge);

            expect(serviceCharge).not.to.have.property("_id");
        });
    });
});

async function dbGenerateServiceCharge(): Promise<ServiceCharge> {
    const serviceCharge = generateServiceCharge();
    await dbServiceCharge.insertOne(cloneDeep(serviceCharge));
    return serviceCharge;
}
