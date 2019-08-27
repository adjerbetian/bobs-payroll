import { buildFakeActions, Fake } from "../../../../test/fakeBuilders";
import {
    generateDirectPaymentMethod,
    generateHoldPaymentMethod,
    generateMailPaymentMethod,
    generateUnionMember
} from "../../../../test/generators";
import { expect } from "../../../../test/unitTest";
import { generateIndex } from "../../../../test/utils";
import { Actions, EmployeeType } from "../../core";
import { TransactionFormatError } from "../errors";
import { Transaction } from "../Transaction";
import { buildChangeEmployeeTransaction } from "./changeEmployee";

describe("changeEmployee", () => {
    let fakeActions: Fake<Actions>;
    let changeEmployee: Transaction;
    let employeeId: number;

    beforeEach(() => {
        fakeActions = buildFakeActions();
        changeEmployee = buildChangeEmployeeTransaction(fakeActions);

        fakeActions.updateEmployee.resolves();

        employeeId = generateIndex();
    });

    describe("basic info", () => {
        describe("Name", () => {
            it("should update the employee's name", async () => {
                await changeEmployee(`${employeeId}`, "Name", "James Bond");

                expect(fakeActions.updateEmployee).to.have.been.calledOnceWith(employeeId, {
                    name: "James Bond"
                });
            });
            it("should throw an error if the name is not defined", async () => {
                const promise = changeEmployee(`${employeeId}`, "Name", "");

                await expect(promise).to.be.rejectedWith(TransactionFormatError, "ChgEmp");
            });
        });
        describe("Address", () => {
            it("should update the employee's address", async () => {
                await changeEmployee(`${employeeId}`, "Address", "my new address");

                expect(fakeActions.updateEmployee).to.have.been.calledOnceWith(employeeId, {
                    address: "my new address"
                });
            });
            it("should throw an error if the address is not defined", async () => {
                const promise = changeEmployee(`${employeeId}`, "Address", "");

                await expect(promise).to.be.rejectedWith(TransactionFormatError, "ChgEmp");
            });
        });
    });
    describe("type", () => {
        describe("Hourly", () => {
            it("should change the employee's type to hourly and set the rate", async () => {
                await changeEmployee(`${employeeId}`, "Hourly", "10.5");

                expect(fakeActions.updateEmployee).to.have.been.calledOnceWith(employeeId, {
                    work: {
                        type: EmployeeType.HOURLY,
                        hourlyRate: 10.5
                    }
                });
            });
            it("should throw an error if the rate is not defined", async () => {
                const promise = changeEmployee(`${employeeId}`, "Hourly", "");

                await expect(promise).to.be.rejectedWith(TransactionFormatError, "ChgEmp");
            });
        });
        describe("Salaried", () => {
            it("should change the employee's type to salaried and set the salary", async () => {
                await changeEmployee(`${employeeId}`, "Salaried", "10.5");

                expect(fakeActions.updateEmployee).to.have.been.calledOnceWith(employeeId, {
                    work: {
                        type: EmployeeType.SALARIED,
                        monthlySalary: 10.5
                    }
                });
            });
            it("should throw an error if the salary is not defined", async () => {
                const promise = changeEmployee(`${employeeId}`, "Salaried", "");

                await expect(promise).to.be.rejectedWith(TransactionFormatError, "ChgEmp");
            });
        });
        describe("Commissioned", () => {
            it("should change the employee's type to salaried and set the salary", async () => {
                await changeEmployee(`${employeeId}`, "Commissioned", "10", "30");

                expect(fakeActions.updateEmployee).to.have.been.calledOnceWith(employeeId, {
                    work: {
                        type: EmployeeType.COMMISSIONED,
                        monthlySalary: 10,
                        commissionRate: 30
                    }
                });
            });
            it("should throw an error if the salary is not defined", async () => {
                const promise = changeEmployee(`${employeeId}`, "Commissioned", "");

                await expect(promise).to.be.rejectedWith(TransactionFormatError, "ChgEmp");
            });
            it("should throw an error if the commission is not defined", async () => {
                const promise = changeEmployee(`${employeeId}`, "Commissioned", "10", "");

                await expect(promise).to.be.rejectedWith(TransactionFormatError, "ChgEmp");
            });
        });
    });
    describe("payment method", () => {
        beforeEach(() => fakeActions.setEmployeePaymentMethod.resolves());

        describe("Hold", () => {
            it("should add the hold paycheck payment method to the employee", async () => {
                await changeEmployee(`${employeeId}`, "Hold");

                const expectedPaymentMethod = generateHoldPaymentMethod({ employeeId });
                expect(fakeActions.setEmployeePaymentMethod).to.have.been.calledOnceWith(expectedPaymentMethod);
            });
        });
        describe("Direct", () => {
            it("should add the direct deposit payment method to the employee", async () => {
                await changeEmployee(`${employeeId}`, "Direct", "bank-id", "account-id");

                const expectedPaymentMethod = generateDirectPaymentMethod({
                    employeeId,
                    bank: "bank-id",
                    account: "account-id"
                });
                expect(fakeActions.setEmployeePaymentMethod).to.have.been.calledOnceWith(expectedPaymentMethod);
            });
            it("should throw a transaction format error when the bank-id is missing", async () => {
                const promise = changeEmployee(`${employeeId}`, "Direct");

                await expect(promise).to.be.rejectedWith(TransactionFormatError, "ChgEmp");
            });
            it("should throw a transaction format error when the account-id is missing", async () => {
                const promise = changeEmployee(`${employeeId}`, "Direct", "bank-id");

                await expect(promise).to.be.rejectedWith(TransactionFormatError, "ChgEmp");
            });
        });
        describe("Mail", () => {
            it("should add the direct deposit payment method to the employee", async () => {
                await changeEmployee(`${employeeId}`, "Mail", "my paycheck address");

                const expectedPaymentMethod = generateMailPaymentMethod({
                    employeeId,
                    address: "my paycheck address"
                });
                expect(fakeActions.setEmployeePaymentMethod).to.have.been.calledOnceWith(expectedPaymentMethod);
            });
            it("should throw a transaction format error when the address is missing", async () => {
                const promise = changeEmployee(`${employeeId}`, "Mail");

                await expect(promise).to.be.rejectedWith(TransactionFormatError, "ChgEmp");
            });
        });
    });
    describe("union", () => {
        describe("Member", () => {
            it("should add the union member", async () => {
                const memberId = `member-${generateIndex()}`;
                fakeActions.createUnionMember.resolves();

                await changeEmployee(`${employeeId}`, "Member", memberId, "Dues", "10.5");

                const expectedUnionMember = generateUnionMember({ memberId, employeeId, rate: 10.5 });
                expect(fakeActions.createUnionMember).to.have.been.calledOnceWith(expectedUnionMember);
            });
        });
        describe("NoMember", () => {});
    });
});
