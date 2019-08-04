import { expect } from "../../test/unitTest";
import { generateHourlyRateEmployee, generateMonthlySalaryEmployee } from "../../test/generators";
import { buildFakeEmployeeRepository, FakeEmployeeRepository } from "../../test/fakeBuilders";
import { buildTransactions, Transactions } from "./addEmployee";

describe("transactions", () => {
    describe("addEmployee", () => {
        let fakeEmployeeRepository: FakeEmployeeRepository;
        let transactions: Transactions;

        beforeEach(() => {
            fakeEmployeeRepository = buildFakeEmployeeRepository();
            fakeEmployeeRepository.insertOne.resolves();
            transactions = buildTransactions(fakeEmployeeRepository);
        });

        it("should insert an hourly rate employee", async () => {
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
        it("should insert an monthly salary employee", async () => {
            const employee = generateMonthlySalaryEmployee();

            await transactions.addEmployee(
                `${employee.id}`,
                `"${employee.name}"`,
                `"${employee.address}"`,
                "S",
                `${employee.monthlySalary}`
            );

            expect(fakeEmployeeRepository.insertOne).to.have.been.calledOnceWith(employee);
        });
        it("should insert an monthly salary with commission employee", async () => {
            const employee = generateMonthlySalaryEmployee({ commissionRate: 10 });

            await transactions.addEmployee(
                `${employee.id}`,
                `"${employee.name}"`,
                `"${employee.address}"`,
                "C",
                `${employee.monthlySalary}`,
                `${employee.commissionRate}`
            );

            expect(fakeEmployeeRepository.insertOne).to.have.been.calledOnceWith(employee);
        });
        it("should throw when the transaction is malformed", async () => {
            const employee = generateMonthlySalaryEmployee({ commissionRate: 10 });

            // noinspection ES6MissingAwait
            const promise = transactions.addEmployee(
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
