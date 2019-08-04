import { expect } from "../../test/unitTest";
import { generateHourlyRateEmployee, generateMonthlySalaryEmployee } from "../../test/generators";
import { buildFakeEmployeeRepository, FakeEmployeeRepository } from "../../test/fakeBuilders";
import { buildAddEmployeeTransaction } from "./addEmployee";
import { Transaction } from "./Transactions";
import { TransactionFormatError } from "../errors/TransactionFormatError";

describe("addEmployee", () => {
    let fakeEmployeeRepository: FakeEmployeeRepository;
    let addEmployee: Transaction;

    beforeEach(() => {
        fakeEmployeeRepository = buildFakeEmployeeRepository();
        addEmployee = buildAddEmployeeTransaction(fakeEmployeeRepository);

        fakeEmployeeRepository.insertOne.resolves();
    });

    it("should insert an hourly rate employee", async () => {
        const employee = generateHourlyRateEmployee();

        await addEmployee(
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

        await addEmployee(
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

        await addEmployee(
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
        const promise = addEmployee(
            `${employee.id}`,
            `"${employee.name}"`,
            `"${employee.address}"`,
            "C",
            `${employee.monthlySalary}`
        );

        await expect(promise).to.be.rejectedWith(TransactionFormatError);
    });
});
