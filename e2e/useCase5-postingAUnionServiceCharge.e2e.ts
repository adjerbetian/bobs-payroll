import { executePayrollCommand, expect } from "../test/e2eTest";
import { createHourlyRateEmployee, createUnionEmployee } from "../test/creators";
import { ServiceCharge } from "../src/entities";
import { generateServiceCharge } from "../test/generators";
import { serviceChargeRepository } from "../src/mongo";

describe.only("Use Case 5: Posting a Union Service Charge", () => {
    it("should insert the service charge in the db", async () => {
        const employee = await createUnionEmployee();
        const serviceCharge = generateServiceCharge({ employeeId: employee.id });

        await executePostServiceCharge(serviceCharge);

        await expectEmployeeToHaveServiceCharge(employee.id, serviceCharge);
    });
    it("should do nothing when the employee is not a union member", async () => {
        const employee = await createHourlyRateEmployee();
        const serviceCharge = generateServiceCharge({ employeeId: employee.id });

        await executePostServiceCharge(serviceCharge);

        await expectEmployeeToHaveNoServiceCharge(employee.id);
    });
    it.skip("should do nothing when the employee does not exist", async () => {
        const serviceCharge = generateServiceCharge();

        await executePostServiceCharge(serviceCharge);

        await expectEmployeeToHaveNoServiceCharge(serviceCharge.employeeId);
    });
    it.skip("should do nothing when the transaction is not of the right format", async () => {
        const employee = await createUnionEmployee();
        const serviceCharge = generateServiceCharge({ employeeId: employee.id });

        await executePayrollCommand(`ServiceCharge ${serviceCharge.employeeId}`);

        await expectEmployeeToHaveNoServiceCharge(serviceCharge.employeeId);
    });
});

async function executePostServiceCharge(serviceCharge: ServiceCharge): Promise<void> {
    await executePayrollCommand(
        `ServiceCharge ${serviceCharge.employeeId} ${serviceCharge.amount}`
    );
}

async function expectEmployeeToHaveServiceCharge(
    employeeId: number,
    serviceCharge: ServiceCharge
): Promise<void> {
    const dbServiceCharges = await serviceChargeRepository.fetchAllOfEmployee(employeeId);
    expect(dbServiceCharges).to.deep.include(serviceCharge);
}

async function expectEmployeeToHaveNoServiceCharge(employeeId: number): Promise<void> {
    const dbServiceCharges = await serviceChargeRepository.fetchAllOfEmployee(employeeId);
    expect(dbServiceCharges).to.be.empty;
}
