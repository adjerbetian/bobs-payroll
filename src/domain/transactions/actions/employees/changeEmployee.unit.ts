import {
    buildStubbedCoreActions,
    entityGenerators,
    expect,
    generateDirectPaymentMethod,
    generateHoldPaymentMethod,
    generateIndex,
    generateMailPaymentMethod,
    Stub
} from "@test/unit";
import { CoreActions, EmployeeType } from "../../../core";
import { TransactionFormatError } from "../../errors";
import { makeChangeEmployeeTransaction } from "./changeEmployee";

describe("changeEmployee", () => {
    let stubbedActions: Stub<CoreActions>;
    let changeEmployee: ReturnType<typeof makeChangeEmployeeTransaction>;
    let employeeId: number;

    beforeEach(() => {
        stubbedActions = buildStubbedCoreActions();
        changeEmployee = makeChangeEmployeeTransaction(stubbedActions);

        stubbedActions.updateEmployee.resolves();

        employeeId = generateIndex();
    });

    describe("basic info", () => {
        describe("Name", () => {
            it("should update the employee's name", async () => {
                await changeEmployee(`${employeeId}`, "Name", "James Bond");

                expect(stubbedActions.updateEmployee).to.have.been.calledOnceWith(employeeId, {
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

                expect(stubbedActions.updateEmployee).to.have.been.calledOnceWith(employeeId, {
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

                expect(stubbedActions.updateEmployee).to.have.been.calledOnceWith(employeeId, {
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

                expect(stubbedActions.updateEmployee).to.have.been.calledOnceWith(employeeId, {
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

                expect(stubbedActions.updateEmployee).to.have.been.calledOnceWith(employeeId, {
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
        beforeEach(() => stubbedActions.createPaymentMethod.resolves());

        describe("Hold", () => {
            it("should add the hold paycheck payment method to the employee", async () => {
                await changeEmployee(`${employeeId}`, "Hold");

                const expectedPaymentMethod = generateHoldPaymentMethod({ employeeId });
                expect(stubbedActions.createPaymentMethod).to.have.been.calledOnceWith(expectedPaymentMethod);
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
                expect(stubbedActions.createPaymentMethod).to.have.been.calledOnceWith(expectedPaymentMethod);
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
                expect(stubbedActions.createPaymentMethod).to.have.been.calledOnceWith(expectedPaymentMethod);
            });
            it("should throw a transaction format error when the address is missing", async () => {
                const promise = changeEmployee(`${employeeId}`, "Mail");

                await expect(promise).to.be.rejectedWith(TransactionFormatError, "ChgEmp");
            });
        });
    });
    describe("union", () => {
        describe("Member", () => {
            let memberId: string;

            beforeEach(() => {
                memberId = `member-${generateIndex()}`;
                stubbedActions.createUnionMember.resolves();
            });

            it("should add the union member", async () => {
                await changeEmployee(`${employeeId}`, "Member", memberId, "Dues", "10.5");

                const expectedUnionMember = entityGenerators.generateUnionMember({ memberId, employeeId, rate: 10.5 });
                expect(stubbedActions.createUnionMember).to.have.been.calledOnceWithEntity(expectedUnionMember);
            });
            it("should throw a TransactionFormatError when the dues rate is not specified", async () => {
                const promise = changeEmployee(`${employeeId}`, "Member", memberId, "Dues");

                await expect(promise).to.have.been.rejectedWith(TransactionFormatError, "ChgEmp");
            });
        });
        describe("NoMember", () => {
            it("should delete the union member", async () => {
                stubbedActions.removeEmployeeFromUnion.resolves();

                await changeEmployee(`${employeeId}`, "NoMember");

                expect(stubbedActions.removeEmployeeFromUnion).to.have.been.calledOnceWith(employeeId);
            });
        });
    });
});
