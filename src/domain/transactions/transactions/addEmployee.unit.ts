import { buildStubActions, buildStubEmployeeRepository, Stub } from "../../../../test/stubBuilders";
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
    let stubActions: Stub<Actions>;
    let stubEmployeeRepository: Stub<EmployeeRepository>;
    let addEmployee: Transaction;

    beforeEach(() => {
        stubActions = buildStubActions();
        stubEmployeeRepository = buildStubEmployeeRepository();
        addEmployee = buildAddEmployeeTransaction(stubActions);

        stubActions.createEmployee.resolves();
        stubEmployeeRepository.insert.resolves();
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

        expect(stubActions.createEmployee).to.have.been.calledOnceWith(employee);
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

        expect(stubActions.createEmployee).to.have.been.calledOnceWith(employee);
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

        expect(stubActions.createEmployee).to.have.been.calledOnceWith(employee);
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
