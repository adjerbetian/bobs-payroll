import { buildFakeEmployeeRepository, Fake } from "../../../../test/fakeBuilders";
import {
    generateCommissionedEmployee,
    generateHourlyEmployee,
    generateSalariedEmployee
} from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { TransactionFormatError } from "../errors";
import { EmployeeRepository } from "../../core";
import { buildAddEmployeeTransaction } from "./addEmployee";
import { Transaction } from "../Transaction";

describe("addEmployee", () => {
    let fakeEmployeeRepository: Fake<EmployeeRepository>;
    let addEmployee: Transaction;

    beforeEach(() => {
        fakeEmployeeRepository = buildFakeEmployeeRepository();
        addEmployee = buildAddEmployeeTransaction({ employeeRepository: fakeEmployeeRepository });

        fakeEmployeeRepository.insertOne.resolves();
    });

    it("should insert an hourly employee", async () => {
        const employee = generateHourlyEmployee();

        await addEmployee(
            `${employee.id}`,
            `"${employee.name}"`,
            `"${employee.address}"`,
            "H",
            `${employee.hourlyRate}`
        );

        expect(fakeEmployeeRepository.insertOne).to.have.been.calledOnceWith(employee);
    });
    it("should insert a salaried employee", async () => {
        const employee = generateSalariedEmployee();

        await addEmployee(
            `${employee.id}`,
            `"${employee.name}"`,
            `"${employee.address}"`,
            "S",
            `${employee.monthlySalary}`
        );

        expect(fakeEmployeeRepository.insertOne).to.have.been.calledOnceWith(employee);
    });
    it("should insert an salaried with commission employee", async () => {
        const employee = generateCommissionedEmployee();

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
        const employee = generateCommissionedEmployee();

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
