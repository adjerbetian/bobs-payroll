import { generateServiceCharge } from "../../../test/generators";
import "../../../test/integrationTest";
import { expect } from "../../../test/unitTest";
import { mongoServiceChargeRepository as repository } from "./mongoServiceChargeRepository";
import { dbServiceCharges as db } from "../db";

describe("mongoServiceChargeRepository", () => {
    describe("fetchAll", () => {
        it("should return all the service charges", async () => {
            const serviceCharge1 = generateServiceCharge();
            const serviceCharge2 = generateServiceCharge();
            await db.insert(serviceCharge1);
            await db.insert(serviceCharge2);

            const dbServiceCharges = await repository.fetchAll();

            expect(dbServiceCharges).to.deep.equal([serviceCharge1, serviceCharge2]);
        });
    });
    describe("fetchAllOfMember", () => {
        it("should return all the employee's service charges", async () => {
            const serviceCharge = generateServiceCharge();
            await db.insert(serviceCharge);

            const salesReceipts = await repository.fetchAllOfMember(serviceCharge.memberId);

            expect(salesReceipts).to.deep.equal([serviceCharge]);
        });
        it("should not return other employees' time cards", async () => {
            const serviceCharge = generateServiceCharge();
            await db.insert(serviceCharge);

            const salesReceipts = await repository.fetchAllOfMember(serviceCharge.memberId + "x");

            expect(salesReceipts).to.be.empty;
        });
    });
    describe("insert", () => {
        it("insert the given service charge", async () => {
            const serviceCharge = generateServiceCharge();

            await repository.insert(serviceCharge);

            const dbServiceCharge = await db.fetch({ memberId: serviceCharge.memberId });
            expect(dbServiceCharge).to.deep.equal(serviceCharge);
        });
        it("should not add the _id field to the entity", async () => {
            const serviceCharge = generateServiceCharge();

            await repository.insert(serviceCharge);

            expect(serviceCharge).not.to.have.property("_id");
        });
    });
});
