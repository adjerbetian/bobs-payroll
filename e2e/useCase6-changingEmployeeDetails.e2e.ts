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
    it("should change the employee's address", async () => {});
    it("should change the employee to hourly rate", async () => {});
    it("should change the employee to monthly salary", async () => {});
    it("should change the employee to commissioned", async () => {});
    it("should change the employee to hold", async () => {});
    it("should change the employee's direct deposit infos ", async () => {});
    it("should change the employee's paycheck mail ", async () => {});
    it("should put the employee in Union", async () => {});
    it("should remove the employee from Union", async () => {});
    describe("on error", () => {
        it("should do nothing when transaction is wrong", async () => {});
        it("should do nothing when the employee does not exist", async () => {});
        it("should do nothing when the union member id is already used", async () => {});
    });
});
