import { buildFakeEmployeeRepository, buildFakePaymentMethodRepository, Fake } from "../../../../test/fakeBuilders";
import {
    generateHoldPaymentMethod,
    generateHourlyEmployee,
    generateSalariedEmployee
} from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { generateIndex } from "../../../../test/utils";
import { EmployeeRepository, EmployeeType, PaymentMethodRepository } from "../../core";
import { TransactionFormatError } from "../errors";
import { buildChangeEmployeeTransaction } from "./changeEmployee";
import { Transaction } from "../Transaction";

describe("addEmployee", () => {
    let fakeEmployeeRepository: Fake<EmployeeRepository>;
    let fakePaymentMethodRepository: Fake<PaymentMethodRepository>;
    let changeEmployee: Transaction;

    beforeEach(() => {
        fakeEmployeeRepository = buildFakeEmployeeRepository();
        fakePaymentMethodRepository = buildFakePaymentMethodRepository();
        changeEmployee = buildChangeEmployeeTransaction({
            employeeRepository: fakeEmployeeRepository,
            paymentMethodRepository: fakePaymentMethodRepository
        });

        fakeEmployeeRepository.updateById.resolves();
    });

    describe("Name", () => {
        it("should update the employee's name", async () => {
            const employee = generateHourlyEmployee();

            await changeEmployee(`${employee.id}`, "Name", "James Bond");

            expect(fakeEmployeeRepository.updateById).to.have.been.calledOnceWith(employee.id, {
                name: "James Bond"
            });
        });
        it("should throw an error if the name is not defined", async () => {
            const employee = generateSalariedEmployee();

            // noinspection ES6MissingAwait
            const promise = changeEmployee(`${employee.id}`, "Name", "");

            await expect(promise).to.be.rejectedWith(TransactionFormatError, "ChgEmp");
        });
    });
    describe("Address", () => {
        it("should update the employee's address", async () => {
            const employee = generateHourlyEmployee();

            await changeEmployee(`${employee.id}`, "Address", "my new address");

            expect(fakeEmployeeRepository.updateById).to.have.been.calledOnceWith(employee.id, {
                address: "my new address"
            });
        });
        it("should throw an error if the address is not defined", async () => {
            const employee = generateSalariedEmployee();

            // noinspection ES6MissingAwait
            const promise = changeEmployee(`${employee.id}`, "Address", "");

            await expect(promise).to.be.rejectedWith(TransactionFormatError, "ChgEmp");
        });
    });
    describe("Hourly", () => {
        it("should change the employee's type to hourly and set the rate", async () => {
            const employee = generateSalariedEmployee();

            await changeEmployee(`${employee.id}`, "Hourly", "10.5");

            expect(fakeEmployeeRepository.updateById).to.have.been.calledOnceWith(employee.id, {
                type: EmployeeType.HOURLY,
                hourlyRate: 10.5
            });
        });
        it("should throw an error if the rate is not defined", async () => {
            const employee = generateSalariedEmployee();

            // noinspection ES6MissingAwait
            const promise = changeEmployee(`${employee.id}`, "Hourly", "");

            await expect(promise).to.be.rejectedWith(TransactionFormatError, "ChgEmp");
        });
    });
    describe("Salaried", () => {
        it("should change the employee's type to salaried and set the salary", async () => {
            const employee = generateHourlyEmployee();

            await changeEmployee(`${employee.id}`, "Salaried", "10.5");

            expect(fakeEmployeeRepository.updateById).to.have.been.calledOnceWith(employee.id, {
                type: EmployeeType.SALARIED,
                monthlySalary: 10.5
            });
        });
        it("should throw an error if the salary is not defined", async () => {
            const employee = generateHourlyEmployee();

            // noinspection ES6MissingAwait
            const promise = changeEmployee(`${employee.id}`, "Salaried", "");

            await expect(promise).to.be.rejectedWith(TransactionFormatError, "ChgEmp");
        });
    });
    describe("Commissioned", () => {
        it("should change the employee's type to salaried and set the salary", async () => {
            const employee = generateHourlyEmployee();

            await changeEmployee(`${employee.id}`, "Commissioned", "10", "30");

            expect(fakeEmployeeRepository.updateById).to.have.been.calledOnceWith(employee.id, {
                type: EmployeeType.COMMISSIONED,
                monthlySalary: 10,
                commissionRate: 30
            });
        });
        it("should throw an error if the salary is not defined", async () => {
            const employee = generateHourlyEmployee();

            // noinspection ES6MissingAwait
            const promise = changeEmployee(`${employee.id}`, "Commissioned", "");

            await expect(promise).to.be.rejectedWith(TransactionFormatError, "ChgEmp");
        });
        it("should throw an error if the commission is not defined", async () => {
            const employee = generateHourlyEmployee();

            // noinspection ES6MissingAwait
            const promise = changeEmployee(`${employee.id}`, "Commissioned", "10", "");

            await expect(promise).to.be.rejectedWith(TransactionFormatError, "ChgEmp");
        });
    });
    describe("Hold", () => {
        beforeEach(() => {
            fakePaymentMethodRepository.insertOne.resolves();
            fakePaymentMethodRepository.deleteByEmployeeId.resolves();
        });

        it("should add the hold paycheck payment method to the employee", async () => {
            const employeeId = generateIndex();

            await changeEmployee(`${employeeId}`, "Hold");

            const expectedPaymentMethod = generateHoldPaymentMethod({ employeeId });
            expect(fakePaymentMethodRepository.insertOne).to.have.been.calledOnceWith(expectedPaymentMethod);
        });
        it("should delete the previous payment method of the employee", async () => {
            const employeeId = generateIndex();

            await changeEmployee(`${employeeId}`, "Hold");

            expect(fakePaymentMethodRepository.deleteByEmployeeId).to.have.been.calledOnceWith(employeeId);
            expect(fakePaymentMethodRepository.deleteByEmployeeId).to.have.been.calledBefore(
                fakePaymentMethodRepository.insertOne
            );
        });
    });
});
