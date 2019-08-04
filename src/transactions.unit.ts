import { expect } from "./test/unitTest";
import { generateEmployee } from "./test/generators";
import { buildTransactions } from "./transactions";
import { buildFakeEmployeeRepository } from "./test/fakeRepositoryBuilder";

describe("transactions", () => {
    describe("addEmployee", () => {
        it("should call the insertOne method of the employeeRepository", async () => {
            const fakeEmployeeRepository = buildFakeEmployeeRepository();
            fakeEmployeeRepository.insertOne.resolves();
            const transactions = buildTransactions(fakeEmployeeRepository);
            const employee = generateEmployee();

            await transactions.addEmployee(
                `${employee.id}`,
                `"${employee.name}"`,
                `"${employee.address}"`,
                "H",
                `${employee.rate}`
            );

            expect(fakeEmployeeRepository.insertOne).to.have.been.calledOnceWith(employee);
        });
    });
});
