import "./test/integrationTest";
import { expect } from "./test/unitTest";
import { generateEmployee } from "./test/generators";
import { employeeRepository } from "./mongo";
import { buildTransactions } from "./transactions";

describe("transactions", () => {
    describe("addEmployee", () => {
        it("should work", async () => {
            const transactions = buildTransactions(employeeRepository);
            const employee = generateEmployee();

            await transactions.addEmployee(
                `${employee.id}`,
                `"${employee.name}"`,
                `"${employee.address}"`,
                "H",
                `${employee.rate}`
            );

            const dbEmployee = await employeeRepository.fetchEmployeeById(employee.id);
            expect(dbEmployee).to.deep.equal(employee);
        });
    });
});
