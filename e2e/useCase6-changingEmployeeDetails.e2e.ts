import { EmployeeType, mongoEmployeeRepository, mongoPaymentMethodRepository, PaymentMethodType } from "../src";
import { executePayrollCommand, expect } from "../test/e2eTest";
import { seedDirectPaymentMethod, seedHourlyEmployee, seedSalariedEmployee } from "../test/seeders";

describe("Use Case 6: Changing Employee Details", () => {
    it("should change the employee's name", async () => {
        const employee = await seedHourlyEmployee();

        await executePayrollCommand(`ChgEmp ${employee.id} Name "James Bond"`);

        const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
        expect(dbEmployee.name).to.equal("James Bond");
    });
    it("should change the employee's address", async () => {
        const employee = await seedHourlyEmployee();

        await executePayrollCommand(`ChgEmp ${employee.id} Address "my new address"`);

        const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
        expect(dbEmployee.address).to.equal("my new address");
    });
    it("should change the employee to hourly", async () => {
        const employee = await seedSalariedEmployee();

        await executePayrollCommand(`ChgEmp ${employee.id} Hourly 10`);

        const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
        expect(dbEmployee).to.have.property("type", EmployeeType.HOURLY);
        expect(dbEmployee).to.have.property("hourlyRate", 10);
        expect(dbEmployee).not.to.have.property("monthlySalary");
    });
    it("should change the employee to monthly salary", async () => {
        const employee = await seedHourlyEmployee();

        await executePayrollCommand(`ChgEmp ${employee.id} Salaried 10`);

        const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
        expect(dbEmployee).to.have.property("type", EmployeeType.SALARIED);
        expect(dbEmployee).to.have.property("monthlySalary", 10);
        expect(dbEmployee).not.to.have.property("hourlyRate");
    });
    it("should change the employee to commissioned", async () => {
        const employee = await seedHourlyEmployee();

        await executePayrollCommand(`ChgEmp ${employee.id} Commissioned 10 30`);

        const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
        expect(dbEmployee).to.have.property("type", EmployeeType.COMMISSIONED);
        expect(dbEmployee).to.have.property("monthlySalary", 10);
        expect(dbEmployee).to.have.property("commissionRate", 30);
        expect(dbEmployee).not.to.have.property("hourlyRate");
    });
    it("should set the employee's payment method to hold", async () => {
        const employee = await seedHourlyEmployee();

        await executePayrollCommand(`ChgEmp ${employee.id} Hold`);

        const dbPaymentMethod = await mongoPaymentMethodRepository.fetchByEmployeeId(employee.id);
        expect(dbPaymentMethod).to.have.property("type", PaymentMethodType.HOLD);
    });
    it("should change the employee's payment method to hold when was direct", async () => {
        const employee = await seedHourlyEmployee();
        await seedDirectPaymentMethod({ employeeId: employee.id });

        await executePayrollCommand(`ChgEmp ${employee.id} Hold`);

        const dbPaymentMethod = await mongoPaymentMethodRepository.fetchByEmployeeId(employee.id);
        expect(dbPaymentMethod).to.have.property("type", PaymentMethodType.HOLD);
        expect(dbPaymentMethod).not.to.have.property("bank");
    });
    it.skip("should change the employee's direct deposit.skip infos ", async () => {});
    it.skip("should change the employee's paycheck mail ", async () => {});
    it.skip("should put the employee in Union", async () => {});
    it.skip("should remove the employee from Union", async () => {});
    it.skip("should do nothing when the union member id is already used", async () => {});
    it.skip("should do nothing when the employee does not exist", async () => {});
});
