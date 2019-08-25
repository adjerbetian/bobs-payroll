import {
    Employee,
    EmployeeType,
    mongoEmployeeRepository,
    mongoPaymentMethodRepository,
    NotFoundError,
    PaymentMethodType
} from "../src";
import { executePayrollCommand, expect } from "../test/e2eTest";
import { seedDirectPaymentMethod, seedHourlyEmployee, seedSalariedEmployee } from "../test/seeders";
import { generateIndex } from "../test/utils";

describe.only("Use Case 6: Changing Employee Details", () => {
    let employee: Employee;

    beforeEach(async () => {
        employee = await seedHourlyEmployee();
    });

    describe("basic infos", () => {
        it("should change the employee's name", async () => {
            await executePayrollCommand(`ChgEmp ${employee.id} Name "James Bond"`);

            const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
            expect(dbEmployee.name).to.equal("James Bond");
        });
        it("should change the employee's address", async () => {
            await executePayrollCommand(`ChgEmp ${employee.id} Address "my new address"`);

            const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
            expect(dbEmployee.address).to.equal("my new address");
        });
        it("should do nothing when the employee does not exist", async () => {
            const nonExistingId = generateIndex();

            await executePayrollCommand(`ChgEmp ${nonExistingId} Address "my new address"`);

            const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
            expect(dbEmployee).to.deep.equal(employee);
        });
    });
    describe("type", () => {
        it("should change the employee to hourly", async () => {
            employee = await seedSalariedEmployee();

            await executePayrollCommand(`ChgEmp ${employee.id} Hourly 10`);

            const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
            expect(dbEmployee).to.have.property("type", EmployeeType.HOURLY);
            expect(dbEmployee).to.have.property("hourlyRate", 10);
            expect(dbEmployee).not.to.have.property("monthlySalary");
        });
        it("should change the employee to monthly salary", async () => {
            employee = await seedHourlyEmployee();

            await executePayrollCommand(`ChgEmp ${employee.id} Salaried 10`);

            const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
            expect(dbEmployee).to.have.property("type", EmployeeType.SALARIED);
            expect(dbEmployee).to.have.property("monthlySalary", 10);
            expect(dbEmployee).not.to.have.property("hourlyRate");
        });
        it("should change the employee to commissioned", async () => {
            employee = await seedHourlyEmployee();

            await executePayrollCommand(`ChgEmp ${employee.id} Commissioned 10 30`);

            const dbEmployee = await mongoEmployeeRepository.fetchById(employee.id);
            expect(dbEmployee).to.have.property("type", EmployeeType.COMMISSIONED);
            expect(dbEmployee).to.have.property("monthlySalary", 10);
            expect(dbEmployee).to.have.property("commissionRate", 30);
            expect(dbEmployee).not.to.have.property("hourlyRate");
        });
    });
    describe("payment method", () => {
        it("should set the employee's payment method to hold", async () => {
            await executePayrollCommand(`ChgEmp ${employee.id} Hold`);

            const dbPaymentMethod = await mongoPaymentMethodRepository.fetchByEmployeeId(employee.id);
            expect(dbPaymentMethod).to.have.property("type", PaymentMethodType.HOLD);
        });
        it("should change the employee's payment method to hold when was direct", async () => {
            await seedDirectPaymentMethod({ employeeId: employee.id });

            await executePayrollCommand(`ChgEmp ${employee.id} Hold`);

            const dbPaymentMethod = await mongoPaymentMethodRepository.fetchByEmployeeId(employee.id);
            expect(dbPaymentMethod).to.have.property("type", PaymentMethodType.HOLD);
            expect(dbPaymentMethod).not.to.have.property("bank");
        });
        it("should set the employee's payment method to direct deposit", async () => {
            await executePayrollCommand(`ChgEmp ${employee.id} Direct "bank-id" "account-id"`);

            const dbPaymentMethod = await mongoPaymentMethodRepository.fetchByEmployeeId(employee.id);
            expect(dbPaymentMethod).to.have.property("type", PaymentMethodType.DIRECT);
            expect(dbPaymentMethod).to.have.property("bank", "bank-id");
            expect(dbPaymentMethod).to.have.property("account", "account-id");
        });
        it("should do nothing when the account is missing", async () => {
            await executePayrollCommand(`ChgEmp ${employee.id} Direct "bank-id"`);

            const promise = mongoPaymentMethodRepository.fetchByEmployeeId(employee.id);
            await expect(promise).to.be.rejectedWith(NotFoundError);
        });
        it.skip("should change the employee's payment method to direct deposit when was hold", async () => {});
        it.skip("should set the employee's payment method to paycheck mail ", async () => {});
        it.skip("should change the employee's payment method to paycheck mail when was hold", async () => {});
    });
    describe("Union", () => {
        it.skip("should put the employee in Union", async () => {});
        it.skip("should remove the employee from Union", async () => {});
        it.skip("should do nothing when the union member id is already used", async () => {});
    });
});
