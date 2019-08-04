import "../test/integrationTest";
import { expect } from "../test/unitTest";
import { generateHourlyRateEmployee, generateMonthlySalaryEmployee } from "../test/generators";
import { employeeRepository } from "./mongo";
import { buildTransactions } from "./transactions";
import { buildProcessTransaction } from "./processTransaction";
import { Employee } from "./entities";
import { NotFoundError } from "./errors";

describe("transactions", () => {
    const transactions = buildTransactions(employeeRepository);
    const processTransaction = buildProcessTransaction(transactions);

    describe("AddEmp", () => {
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

            await expectEmployeeToHaveBeenStored(employee);
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

            await expectEmployeeToHaveBeenStored(employee);
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

            await expectEmployeeToHaveBeenStored(employee);
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
    describe("DelEmp", () => {
        it("should delete an existing employee", async () => {
            const employee = generateHourlyRateEmployee();
            await employeeRepository.insertOne(employee);

            await processTransaction("DelEmp", `${employee.id}`);

            await expectEmployeeNotToExistsInDB(employee.id);
        });
        it("should reject when the employee does not exist", async () => {
            const employee = generateHourlyRateEmployee();
            await employeeRepository.insertOne(employee);

            // noinspection ES6MissingAwait
            const promise = processTransaction("DelEmp", `${employee.id + 1}`);

            await expect(promise).to.be.rejectedWith(NotFoundError);
            await expectEmployeeToExistsInDB(employee.id);
        });
    });
});

async function expectEmployeeToHaveBeenStored(employee: Employee): Promise<void> {
    const dbEmployee = await employeeRepository.fetchEmployeeById(employee.id);
    expect(dbEmployee).to.deep.equal(employee);
}

async function expectEmployeeToExistsInDB(id: number): Promise<void> {
    const employeeExistsInDB = await employeeRepository.exists({ id });
    expect(employeeExistsInDB).to.be.true;
}

async function expectEmployeeNotToExistsInDB(id: number): Promise<void> {
    const employeeExistsInDB = await employeeRepository.exists({ id });
    expect(employeeExistsInDB).to.be.false;
}
