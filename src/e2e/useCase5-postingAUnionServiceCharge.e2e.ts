import { generators, seeders, executePayrollCommand, expect } from "@test/e2e";
import { dbServiceCharges, ServiceCharge } from "../app";

describe("Use Case 5: Posting a Union Service Charge", () => {
    it("should insert the service charge in the db", async () => {
        const unionMember = await seeders.seedUnionMember();
        const serviceCharge = generators.generateServiceCharge({ memberId: unionMember.getMemberId() });

        await executePostServiceCharge(serviceCharge);

        await expectServiceChargeToHaveBeenInserted(serviceCharge);
    });
    it("should do nothing when the employee is not a union member", async () => {
        const serviceCharge = generators.generateServiceCharge({ memberId: "non-existing" });

        await executePostServiceCharge(serviceCharge);

        await expectServiceChargeNotToHaveBeenInserted(serviceCharge);
    });
    it("should do nothing when the transaction is not of the right format", async () => {
        const unionMember = await seeders.seedUnionMember();
        const serviceCharge = generators.generateServiceCharge({ memberId: unionMember.getMemberId() });

        await executePayrollCommand(`ServiceCharge ${serviceCharge.getMemberId()}`);

        await expectServiceChargeNotToHaveBeenInserted(serviceCharge);
    });
});

async function executePostServiceCharge(serviceCharge: ServiceCharge): Promise<void> {
    await executePayrollCommand(`ServiceCharge ${serviceCharge.getMemberId()} ${serviceCharge.getAmount()}`);
}

async function expectServiceChargeToHaveBeenInserted(serviceCharge: ServiceCharge): Promise<void> {
    const serviceCharges = await dbServiceCharges.fetchAll({});
    expect(serviceCharges).entities.to.include(serviceCharge);
}

async function expectServiceChargeNotToHaveBeenInserted(serviceCharge: ServiceCharge): Promise<void> {
    const serviceCharges = await dbServiceCharges.fetchAll({});
    expect(serviceCharges).entities.not.to.include(serviceCharge);
}
