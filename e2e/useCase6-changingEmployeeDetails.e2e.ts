import { mongoEmployeeRepository } from "../src";
import { executePayrollCommand, expect } from "../test/e2eTest";
import { seedHourlyRateEmployee } from "../test/seeders";

describe("Use Case 6: Changing Employee Details", () => {
    it("should change the employee's name", async () => {
        const employee = await seedHourlyRateEmployee();

        await executePayrollCommand(`ChgEmp ${employee.id} Name "James Bond"`);

        const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
        expect(dbEmployee.name).to.equal("James Bond");
    });
    it("should change the employee's address", async () => {
        const employee = await seedHourlyRateEmployee();

        await executePayrollCommand(`ChgEmp ${employee.id} Address "my new address"`);

        const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
        expect(dbEmployee.address).to.equal("my new address");
    });
    it.skip("should change the employee to hourly rate", async () => {});
    it.skip("should change the employee to monthly salary", async () => {});
    it.skip("should change the employee to commissioned", async () => {});
    it.skip("should change the employee to hold", async () => {});
    it.skip("should change the employee's direct deposit.skip infos ", async () => {});
    it.skip("should change the employee's paycheck mail ", async () => {});
    it.skip("should put the employee in Union", async () => {});
    it.skip("should remove the employee from Union", async () => {});
    describe("on error", () => {
        it.skip("should do nothing when transaction is wrong", async () => {});
        it.skip("should do nothing when the employee does not exist", async () => {});
        it.skip("should do nothing when the union member id is already used", async () => {});
    });
});
