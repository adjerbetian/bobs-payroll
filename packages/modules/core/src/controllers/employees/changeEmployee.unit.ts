import { expect, generateIndex, Stub } from "@infra/test";
import {
    CoreUseCases,
    DirectPaymentMethodCreationModel,
    EmployeeType,
    HoldPaymentMethodCreationModel,
    MailPaymentMethodCreationModel,
    PaymentMethodType,
    UnionMembershipCreationModel
} from "../../domain";
import { RouteFormatError } from "../errors";
import { buildStubbedCoreUseCases } from "../test";
import { makeChangeEmployeeController } from "./changeEmployee";

describe("changeEmployee", () => {
    let stubbedUseCases: Stub<CoreUseCases>;
    let changeEmployee: ReturnType<typeof makeChangeEmployeeController>;
    let employeeId: number;

    beforeEach(() => {
        stubbedUseCases = buildStubbedCoreUseCases();
        changeEmployee = makeChangeEmployeeController(stubbedUseCases);

        stubbedUseCases.updateEmployee.resolves();
        employeeId = generateIndex();
    });

    describe("basic info", () => {
        describe("Name", () => {
            it("should update the employee's name", async () => {
                await changeEmployee(`${employeeId}`, "Name", "James Bond");

                expect(stubbedUseCases.updateEmployee).to.have.been.calledOnceWith(employeeId, {
                    name: "James Bond"
                });
            });
            it("should throw an error if the name is not defined", async () => {
                const promise = changeEmployee(`${employeeId}`, "Name", "");

                await expect(promise).to.be.rejectedWith(RouteFormatError, "ChgEmp");
            });
        });
        describe("Address", () => {
            it("should update the employee's address", async () => {
                await changeEmployee(`${employeeId}`, "Address", "my new address");

                expect(stubbedUseCases.updateEmployee).to.have.been.calledOnceWith(employeeId, {
                    address: "my new address"
                });
            });
            it("should throw an error if the address is not defined", async () => {
                const promise = changeEmployee(`${employeeId}`, "Address", "");

                await expect(promise).to.be.rejectedWith(RouteFormatError, "ChgEmp");
            });
        });
    });
    describe("type", () => {
        describe("Hourly", () => {
            it("should change the employee's type to hourly and set the rate", async () => {
                await changeEmployee(`${employeeId}`, "Hourly", "10.5");

                expect(stubbedUseCases.updateEmployee).to.have.been.calledOnceWith(employeeId, {
                    type: EmployeeType.HOURLY,
                    hourlyRate: 10.5
                });
            });
            it("should throw an error if the rate is not defined", async () => {
                const promise = changeEmployee(`${employeeId}`, "Hourly", "");

                await expect(promise).to.be.rejectedWith(RouteFormatError, "ChgEmp");
            });
        });
        describe("Salaried", () => {
            it("should change the employee's type to salaried and set the salary", async () => {
                await changeEmployee(`${employeeId}`, "Salaried", "10.5");

                expect(stubbedUseCases.updateEmployee).to.have.been.calledOnceWith(employeeId, {
                    type: EmployeeType.SALARIED,
                    salary: 10.5
                });
            });
            it("should throw an error if the salary is not defined", async () => {
                const promise = changeEmployee(`${employeeId}`, "Salaried", "");

                await expect(promise).to.be.rejectedWith(RouteFormatError, "ChgEmp");
            });
        });
        describe("Commissioned", () => {
            it("should change the employee's type to salaried and set the salary", async () => {
                await changeEmployee(`${employeeId}`, "Commissioned", "10", "30");

                expect(stubbedUseCases.updateEmployee).to.have.been.calledOnceWith(employeeId, {
                    type: EmployeeType.COMMISSIONED,
                    salary: 10,
                    commissionRate: 30
                });
            });
            it("should throw an error if the salary is not defined", async () => {
                const promise = changeEmployee(`${employeeId}`, "Commissioned", "", "");

                await expect(promise).to.be.rejectedWith(RouteFormatError, "ChgEmp");
            });
            it("should throw an error if the commission is not defined", async () => {
                const promise = changeEmployee(`${employeeId}`, "Commissioned", "10", "");

                await expect(promise).to.be.rejectedWith(RouteFormatError, "ChgEmp");
            });
        });
    });
    describe("payment method", () => {
        beforeEach(() => stubbedUseCases.createPaymentMethod.resolves());

        describe("Hold", () => {
            it("should add the hold paycheck payment method to the employee", async () => {
                await changeEmployee(`${employeeId}`, "Hold");

                const requestModel: HoldPaymentMethodCreationModel = {
                    employeeId,
                    type: PaymentMethodType.HOLD
                };
                expect(stubbedUseCases.createPaymentMethod).to.have.been.calledOnceWith(requestModel);
            });
        });
        describe("Direct", () => {
            it("should add the direct deposit payment method to the employee", async () => {
                await changeEmployee(`${employeeId}`, "Direct", "bank-id", "account-id");

                const requestModel: DirectPaymentMethodCreationModel = {
                    employeeId,
                    type: PaymentMethodType.DIRECT,
                    bank: "bank-id",
                    account: "account-id"
                };
                expect(stubbedUseCases.createPaymentMethod).to.have.been.calledOnceWith(requestModel);
            });
            it("should throw a transaction format error when the bank-id is missing", async () => {
                const promise = changeEmployee(`${employeeId}`, "Direct", "", "");

                await expect(promise).to.be.rejectedWith(RouteFormatError, "ChgEmp");
            });
            it("should throw a transaction format error when the account-id is missing", async () => {
                const promise = changeEmployee(`${employeeId}`, "Direct", "bank-id", "");

                await expect(promise).to.be.rejectedWith(RouteFormatError, "ChgEmp");
            });
        });
        describe("Mail", () => {
            it("should add the direct deposit payment method to the employee", async () => {
                await changeEmployee(`${employeeId}`, "Mail", "my paycheck address");

                const requestModel: MailPaymentMethodCreationModel = {
                    employeeId,
                    type: PaymentMethodType.MAIL,
                    address: "my paycheck address"
                };
                expect(stubbedUseCases.createPaymentMethod).to.have.been.calledOnceWith(requestModel);
            });
            it("should throw a transaction format error when the address is missing", async () => {
                const promise = changeEmployee(`${employeeId}`, "Mail", "");

                await expect(promise).to.be.rejectedWith(RouteFormatError, "ChgEmp");
            });
        });
    });
    describe("union", () => {
        describe("Member", () => {
            let memberId: string;

            beforeEach(() => {
                memberId = `member-${generateIndex()}`;
                stubbedUseCases.createUnionMembership.resolves();
            });

            it("should add the union member", async () => {
                await changeEmployee(`${employeeId}`, "Member", memberId, "Dues", "10.5");

                const requestModel: UnionMembershipCreationModel = { memberId, employeeId, rate: 10.5 };
                expect(stubbedUseCases.createUnionMembership).to.have.been.calledOnceWith(requestModel);
            });
            it("should throw a RouteFormatError when the dues rate is not specified", async () => {
                const promise = changeEmployee(`${employeeId}`, "Member", memberId, "Dues", "");

                await expect(promise).to.have.been.rejectedWith(RouteFormatError, "ChgEmp");
            });
        });
        describe("NoMember", () => {
            it("should delete the union member", async () => {
                stubbedUseCases.removeEmployeeFromUnion.resolves();

                await changeEmployee(`${employeeId}`, "NoMember");

                expect(stubbedUseCases.removeEmployeeFromUnion).to.have.been.calledOnceWith(employeeId);
            });
        });
    });
});
