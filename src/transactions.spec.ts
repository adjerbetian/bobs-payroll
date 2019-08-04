import "../test/integrationTest";
import { expect } from "../test/unitTest";
import { generateHourlyRateEmployee, generateMonthlySalaryEmployee } from "../test/generators";
import { employeeRepository } from "./mongo";
import { buildTransactions } from "./transactions";

describe("transactions", () => {
    describe("addEmployee", () => {
        it("should add employee with a hourly rate", async () => {
            const transactions = buildTransactions(employeeRepository);
            const employee = generateHourlyRateEmployee();

            await transactions.addEmployee(
                `${employee.id}`,
                `"${employee.name}"`,
                `"${employee.address}"`,
                "H",
                `${employee.hourlyRate}`
            );

            const dbEmployee = await employeeRepository.fetchEmployeeById(employee.id);
            expect(dbEmployee).to.deep.equal(employee);
        });

        it("should add employee with a monthly salary", async () => {
            const transactions = buildTransactions(employeeRepository);
            const employee = generateMonthlySalaryEmployee();

            await transactions.addEmployee(
                `${employee.id}`,
                `"${employee.name}"`,
                `"${employee.address}"`,
                "S",
                `${employee.salary}`
            );

            const dbEmployee = await employeeRepository.fetchEmployeeById(employee.id);
            expect(dbEmployee).to.deep.equal(employee);
        });
    });
});
