import { buildFakeActions, buildFakeEmployeeRepository, Fake } from "../../../../test/fakeBuilders";
import {
    generateCommissionedEmployee,
    generateHourlyEmployee,
    generateSalariedEmployee
} from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { TransactionFormatError } from "../errors";
import { Actions, EmployeeRepository } from "../../core";
import { buildAddEmployeeTransaction } from "./addEmployee";
import { Transaction } from "../Transaction";

describe("addEmployee", () => {
    let fakeActions: Fake<Actions>;
    let fakeEmployeeRepository: Fake<EmployeeRepository>;
    let addEmployee: Transaction;

    beforeEach(() => {
        fakeActions = buildFakeActions();
        fakeEmployeeRepository = buildFakeEmployeeRepository();
        addEmployee = buildAddEmployeeTransaction(fakeActions);

        fakeActions.createEmployee.resolves();
        fakeEmployeeRepository.insert.resolves();
    });

    it("should insert an hourly employee", async () => {
        const employee = generateHourlyEmployee();

        await addEmployee(
            `${employee.id}`,
            `"${employee.name}"`,
            `"${employee.address}"`,
            "H",
            `${employee.work.hourlyRate}`
        );

        expect(fakeActions.createEmployee).to.have.been.calledOnceWith(employee);
    });
    it("should insert a salaried employee", async () => {
        const employee = generateSalariedEmployee();

        await addEmployee(
            `${employee.id}`,
            `"${employee.name}"`,
            `"${employee.address}"`,
            "S",
            `${employee.work.monthlySalary}`
        );

        expect(fakeActions.createEmployee).to.have.been.calledOnceWith(employee);
    });
    it("should insert an salaried with commission employee", async () => {
        const employee = generateCommissionedEmployee();

        await addEmployee(
            `${employee.id}`,
            `"${employee.name}"`,
            `"${employee.address}"`,
            "C",
            `${employee.work.monthlySalary}`,
            `${employee.work.commissionRate}`
        );

        expect(fakeActions.createEmployee).to.have.been.calledOnceWith(employee);
    });
    it("should throw when the transaction is malformed", async () => {
        const employee = generateCommissionedEmployee();

        const promise = addEmployee(
            `${employee.id}`,
            `"${employee.name}"`,
            `"${employee.address}"`,
            "C",
            `${employee.work.monthlySalary}`
        );

        await expect(promise).to.be.rejectedWith(TransactionFormatError, "AddEmp");
    });
});
