import { expect } from "../test/unitTest";
import { generateHourlyRateEmployee, generateMonthlySalaryEmployee } from "../test/generators";
import { buildTransactions, Transaction } from "./transactions";
import { buildFakeEmployeeRepository, FakeEmployeeRepository } from "../test/fakeRepositoryBuilder";

describe("transactions", () => {
    describe("addEmployee", () => {
        let fakeEmployeeRepository: FakeEmployeeRepository;
        let transactions: Transaction;

        beforeEach(() => {
            fakeEmployeeRepository = buildFakeEmployeeRepository();
            fakeEmployeeRepository.insertOne.resolves();
            transactions = buildTransactions(fakeEmployeeRepository);
        });

        describe("with a hourly rate emply", () => {
            it("should call the insertOne method of the employeeRepository", async () => {
                const employee = generateHourlyRateEmployee();

                await transactions.addEmployee(
                    `${employee.id}`,
                    `"${employee.name}"`,
                    `"${employee.address}"`,
                    "H",
                    `${employee.hourlyRate}`
                );

                expect(fakeEmployeeRepository.insertOne).to.have.been.calledOnceWith(employee);
            });
        });

        describe("with a monthly salary", () => {
            it("should call the insertOne method of the employeeRepository", async () => {
                const fakeEmployeeRepository = buildFakeEmployeeRepository();
                fakeEmployeeRepository.insertOne.resolves();
                const transactions = buildTransactions(fakeEmployeeRepository);
                const employee = generateMonthlySalaryEmployee();

                await transactions.addEmployee(
                    `${employee.id}`,
                    `"${employee.name}"`,
                    `"${employee.address}"`,
                    "S",
                    `${employee.salary}`
                );

                expect(fakeEmployeeRepository.insertOne).to.have.been.calledOnceWith(employee);
            });
        });
    });
});
