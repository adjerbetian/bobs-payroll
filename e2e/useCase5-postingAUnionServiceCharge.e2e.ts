import { executePayrollCommand, expect, generateServiceCharge, seedUnionMember } from "@test/e2e";
import { dbServiceCharges, ServiceCharge } from "../src";

describe("Use Case 5: Posting a Union Service Charge", () => {
    it("should insert the service charge in the db", async () => {
        const unionMember = await seedUnionMember();
        const serviceCharge = generateServiceCharge({ memberId: unionMember.getMemberId() });

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
        const serviceCharge = generateServiceCharge({ memberId: unionMember.getMemberId() });

        await executePayrollCommand(`ServiceCharge ${serviceCharge.memberId}`);

        await expectServiceChargeNotToHaveBeenInserted(serviceCharge);
    });
});

async function executePostServiceCharge(serviceCharge: ServiceCharge): Promise<void> {
    await executePayrollCommand(`ServiceCharge ${serviceCharge.memberId} ${serviceCharge.amount}`);
}

async function expectServiceChargeToHaveBeenInserted(serviceCharge: ServiceCharge): Promise<void> {
    const serviceCharges = await dbServiceCharges.fetchAll({});
    expect(serviceCharges).to.deep.include(serviceCharge);
}

async function expectServiceChargeNotToHaveBeenInserted(serviceCharge: ServiceCharge): Promise<void> {
    const serviceCharges = await dbServiceCharges.fetchAll({});
    expect(serviceCharges).not.to.deep.include(serviceCharge);
}
