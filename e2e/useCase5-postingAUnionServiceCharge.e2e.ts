import { ServiceCharge, mongoServiceChargeRepository } from "../src";
import { seedHourlyEmployee, seedUnionEmployee } from "../test/seeders";
import { executePayrollCommand, expect } from "../test/e2eTest";
import { generateServiceCharge } from "../test/generators";

describe("Use Case 5: Posting a Union Service Charge", () => {
    it("should insert the service charge in the db", async () => {
        const employee = await seedUnionEmployee();
        const serviceCharge = generateServiceCharge({ memberId: employee.memberId as string });

        await executePostServiceCharge(serviceCharge);

        await expectServiceChargeToHaveBeenInserted(serviceCharge);
    });
    it("should do nothing when the employee is not a union member", async () => {
        const employee = await seedHourlyEmployee();
        const serviceCharge = generateServiceCharge({ memberId: employee.memberId as string });

        await executePostServiceCharge(serviceCharge);

        await expectServiceChargeNotToHaveBeenInserted(serviceCharge);
    });
    it("should do nothing when the employee does not exist", async () => {
        const serviceCharge = generateServiceCharge();

        await executePostServiceCharge(serviceCharge);

        await expectServiceChargeNotToHaveBeenInserted(serviceCharge);
    });
    it("should do nothing when the transaction is not of the right format", async () => {
        const employee = await seedUnionEmployee();
        const serviceCharge = generateServiceCharge({ memberId: employee.memberId as string });

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
