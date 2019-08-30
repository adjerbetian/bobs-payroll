import { buildStubFor, Stub } from "../../../test/stubBuilders";
import {
    generateHourlyEmployee,
    generateIndex,
    generateSalesReceipt,
    generateServiceCharge,
    generateTimeCard
} from "../../../test/generators";
import { expect } from "../../../test/unitTest";
import { isoDate } from "../../utils";
import { buildProcessTransaction, ProcessTransaction } from "./processTransaction";
import { Transactions } from "./transactions";

describe("processTransaction", () => {
    let processTransaction: ProcessTransaction;
    let stubTransactions: Stub<Transactions>;

    beforeEach(() => {
        stubTransactions = buildStubTransactions();
        processTransaction = buildProcessTransaction(stubTransactions);
    });

    describe("AddEmp", () => {
        it("should call the addEmployee transaction", async () => {
            stubTransactions.addEmployee.resolves();
            const employee = generateHourlyEmployee();

            await processTransaction([
                "AddEmp",
                `${employee.id}`,
                `"${employee.name}"`,
                `"${employee.address}"`,
                "H",
                `${employee.work.hourlyRate}`
            ]);

            expect(stubTransactions.addEmployee).to.have.been.calledOnceWith(
                `${employee.id}`,
                `"${employee.name}"`,
                `"${employee.address}"`,
                "H",
                `${employee.work.hourlyRate}`
            );
        });
    });
    describe("DelEmp", () => {
        it("should call the deleteEmployee transaction", async () => {
            stubTransactions.deleteEmployee.resolves();
            const employeeId = generateIndex();

            await processTransaction(["DelEmp", `${employeeId}`]);

            expect(stubTransactions.deleteEmployee).to.have.been.calledOnceWith(`${employeeId}`);
        });
    });
    describe("TimeCard", () => {
        it("should call the postTimeCard transaction", async () => {
            stubTransactions.postTimeCard.resolves();
            const timeCard = generateTimeCard();

            await processTransaction(["TimeCard", `${timeCard.employeeId}`, `${timeCard.date}`, `${timeCard.hours}`]);

            expect(stubTransactions.postTimeCard).to.have.been.calledOnceWith(
                `${timeCard.employeeId}`,
                `${timeCard.date}`,
                `${timeCard.hours}`
            );
        });
    });
    describe("SalesReceipt", () => {
        it("should call the postSalesReceipt transaction", async () => {
            stubTransactions.postSalesReceipt.resolves();
            const salesReceipt = generateSalesReceipt();

            await processTransaction([
                "SalesReceipt",
                `${salesReceipt.employeeId}`,
                `${salesReceipt.date}`,
                `${salesReceipt.amount}`
            ]);

            expect(stubTransactions.postSalesReceipt).to.have.been.calledOnceWith(
                `${salesReceipt.employeeId}`,
                `${salesReceipt.date}`,
                `${salesReceipt.amount}`
            );
        });
    });
    describe("ServiceCharge", () => {
        it("should call the postServiceCharge transaction", async () => {
            stubTransactions.postServiceCharge.resolves();
            const serviceCharge = generateServiceCharge();

            await processTransaction(["ServiceCharge", `${serviceCharge.memberId}`, `${serviceCharge.amount}`]);

            expect(stubTransactions.postServiceCharge).to.have.been.calledOnceWith(
                `${serviceCharge.memberId}`,
                `${serviceCharge.amount}`
            );
        });
    });
    describe("ChgEmp", () => {
        it("should call the changeEmployee transaction", async () => {
            stubTransactions.changeEmployee.resolves();
            const employee = generateHourlyEmployee();

            await processTransaction(["ChgEmp", `${employee.id}`, "Name", "James Bond"]);

            expect(stubTransactions.changeEmployee).to.have.been.calledOnceWith(`${employee.id}`, "Name", "James Bond");
        });
    });
    describe("Payroll", () => {
        it("should call the runPayroll transaction", async () => {
            stubTransactions.runPayroll.resolves();
            const date = isoDate();

            await processTransaction(["Payroll", `${date}`]);

            expect(stubTransactions.runPayroll).to.have.been.calledOnceWith(`${date}`);
        });
    });
});

export function buildStubTransactions(): Stub<Transactions> {
    return buildStubFor({
        addEmployee: true,
        deleteEmployee: true,
        postTimeCard: true,
        postSalesReceipt: true,
        postServiceCharge: true,
        changeEmployee: true,
        runPayroll: true
    });
}
