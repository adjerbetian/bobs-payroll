import "../test/integrationTest";
import { expect } from "../test/unitTest";
import { generateHourlyRateEmployee, generateMonthlySalaryEmployee } from "../test/generators";
import { employeeRepository } from "./mongo";
import { buildTransactions } from "./transactions";
import { Employee } from "./entities";

describe("transactions", () => {
    const transactions = buildTransactions(employeeRepository);

    describe("addEmployee", () => {
        it("should add an employee with a hourly rate", async () => {
            const employee = generateHourlyRateEmployee();

            await transactions.addEmployee(
                `${employee.id}`,
                `"${employee.name}"`,
                `"${employee.address}"`,
                "H",
                `${employee.hourlyRate}`
            );

            await expectEmployeeToExistInDB(employee);
        });

        it("should add an employee with a monthly salary", async () => {
            const employee = generateMonthlySalaryEmployee();

            await transactions.addEmployee(
                `${employee.id}`,
                `"${employee.name}"`,
                `"${employee.address}"`,
                "S",
                `${employee.monthlySalary}`
            );

            await expectEmployeeToExistInDB(employee);
        });

        it("should add an employee with a monthly salary and a commission rate", async () => {
            const employee = generateMonthlySalaryEmployee({ commissionRate: 10 });

            await transactions.addEmployee(
                `${employee.id}`,
                `"${employee.name}"`,
                `"${employee.address}"`,
                "C",
                `${employee.monthlySalary}`,
                `${employee.commissionRate}`
            );

            await expectEmployeeToExistInDB(employee);
        });
    });
});

async function expectEmployeeToExistInDB(employee: Employee): Promise<void> {
    const dbEmployee = await employeeRepository.fetchEmployeeById(employee.id);
    expect(dbEmployee).to.deep.equal(employee);
}
