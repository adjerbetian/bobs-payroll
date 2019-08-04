import "../test/integrationTest";
import { expect } from "../test/unitTest";
import { generateHourlyRateEmployee, generateMonthlySalaryEmployee } from "../test/generators";
import { employeeRepository } from "./mongo";
import { buildTransactions } from "./transactions";
import { buildProcessTransaction } from "./processTransaction";
import { Employee } from "./entities";

describe("transactions", () => {
    const transactions = buildTransactions(employeeRepository);
    const processTransaction = buildProcessTransaction(transactions);

    describe("addEmployee", () => {
        it("should add an employee with a hourly rate", async () => {
            const employee = generateHourlyRateEmployee();

            await processTransaction(
                "AddEmp",
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

            await processTransaction(
                "AddEmp",
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

            await processTransaction(
                "AddEmp",
                `${employee.id}`,
                `"${employee.name}"`,
                `"${employee.address}"`,
                "C",
                `${employee.monthlySalary}`,
                `${employee.commissionRate}`
            );

            await expectEmployeeToExistInDB(employee);
        });

        it("should reject when the transaction is wrong", async () => {
            const employee = generateMonthlySalaryEmployee({ commissionRate: 10 });

            // noinspection ES6MissingAwait
            const promise = processTransaction(
                "AddEmp",
                `${employee.id}`,
                `"${employee.name}"`,
                `"${employee.address}"`,
                "C",
                `${employee.monthlySalary}`
            );

            await expect(promise).to.be.rejected;
        });
    });
});

async function expectEmployeeToExistInDB(employee: Employee): Promise<void> {
    const dbEmployee = await employeeRepository.fetchEmployeeById(employee.id);
    expect(dbEmployee).to.deep.equal(employee);
}
