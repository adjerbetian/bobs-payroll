import { buildFakeEmployeeRepository, Fake } from "../../../test/fakeBuilders";
import {
    generateCommissionedSalaryEmployee,
    generateHourlyRateEmployee,
    generateMonthlySalaryEmployee
} from "../../../test/generators";
import { expect } from "../../../test/unitTest";
import { TransactionFormatError } from "../errors";
import { EmployeeRepository } from "../repositories";
import { buildAddEmployeeTransaction } from "./addEmployee";
import { Transaction } from "./Transactions";

describe("addEmployee", () => {
    let fakeEmployeeRepository: Fake<EmployeeRepository>;
    let addEmployee: Transaction;

    beforeEach(() => {
        fakeEmployeeRepository = buildFakeEmployeeRepository();
        addEmployee = buildAddEmployeeTransaction({ employeeRepository: fakeEmployeeRepository });

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
        const employee = generateCommissionedSalaryEmployee();

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
        const employee = generateCommissionedSalaryEmployee();

        // noinspection ES6MissingAwait
        const promise = addEmployee(
            `${employee.id}`,
            `"${employee.name}"`,
            `"${employee.address}"`,
            "C",
            `${employee.monthlySalary}`
        );

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "AddEmp");
    });
});
