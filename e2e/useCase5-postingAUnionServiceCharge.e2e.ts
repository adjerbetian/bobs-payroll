import { mongoServiceChargeRepository, ServiceCharge } from "../src";
import { executePayrollCommand, expect } from "../test/e2eTest";
import { generateServiceCharge } from "../test/generators";
import { seedUnionMember } from "../test/seeders";

describe("Use Case 5: Posting a Union Service Charge", () => {
    it("should insert the service charge in the db", async () => {
        const unionMember = await seedUnionMember();
        const serviceCharge = generateServiceCharge({ memberId: unionMember.memberId });

        await executePostServiceCharge(serviceCharge);

        await expectServiceChargeToHaveBeenInserted(serviceCharge);
    });
    it("should do nothing when the employee is not a union member", async () => {
        const serviceCharge = generateServiceCharge({ memberId: "non-existing" });

        await executePostServiceCharge(serviceCharge);

        await expectServiceChargeNotToHaveBeenInserted(serviceCharge);
    });
    it("should do nothing when the transaction is not of the right format", async () => {
        const unionMember = await seedUnionMember();
        const serviceCharge = generateServiceCharge({ memberId: unionMember.memberId });

        await executePayrollCommand(`ServiceCharge ${serviceCharge.memberId}`);

        await expectServiceChargeNotToHaveBeenInserted(serviceCharge);
    });
});

async function executePostServiceCharge(serviceCharge: ServiceCharge): Promise<void> {
    await executePayrollCommand(`ServiceCharge ${serviceCharge.memberId} ${serviceCharge.amount}`);
}

async function expectServiceChargeToHaveBeenInserted(serviceCharge: ServiceCharge): Promise<void> {
    const dbServiceCharges = await mongoServiceChargeRepository.fetchAll();
    expect(dbServiceCharges).to.deep.include(serviceCharge);
}

async function expectServiceChargeNotToHaveBeenInserted(serviceCharge: ServiceCharge): Promise<void> {
    const dbServiceCharges = await mongoServiceChargeRepository.fetchAll();
    expect(dbServiceCharges).not.to.deep.include(serviceCharge);
}
