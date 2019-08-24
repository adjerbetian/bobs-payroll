import { buildFakeTransactions, Fake } from "../../../test/fakeBuilders";
import {
    generateHourlyEmployee,
    generateSalesReceipt,
    generateServiceCharge,
    generateTimeCard
} from "../../../test/generators";
import { expect } from "../../../test/unitTest";
import { generateIndex } from "../../../test/utils";
import { buildProcessTransaction, ProcessTransaction } from "./processTransaction";
import { Transactions } from "./transactions";

describe("processTransaction", () => {
    let processTransaction: ProcessTransaction;
    let fakeTransactions: Fake<Transactions>;

    beforeEach(() => {
        fakeTransactions = buildFakeTransactions();
        processTransaction = buildProcessTransaction(fakeTransactions);
    });

    describe("AddEmp", () => {
        it("should call the addEmployee transaction", async () => {
            fakeTransactions.addEmployee.resolves();
            const employee = generateHourlyEmployee();

            await processTransaction([
                "AddEmp",
                `${employee.id}`,
                `"${employee.name}"`,
                `"${employee.address}"`,
                "H",
                `${employee.hourlyRate}`
            ]);

            expect(fakeTransactions.addEmployee).to.have.been.calledOnceWith(
                `${employee.id}`,
                `"${employee.name}"`,
                `"${employee.address}"`,
                "H",
                `${employee.hourlyRate}`
            );
        });
    });
    describe("DelEmp", () => {
        it("should call the deleteEmployee transaction", async () => {
            fakeTransactions.deleteEmployee.resolves();
            const employeeId = generateIndex();

            await processTransaction(["DelEmp", `${employeeId}`]);

            expect(fakeTransactions.deleteEmployee).to.have.been.calledOnceWith(`${employeeId}`);
        });
    });
    describe("TimeCard", () => {
        it("should call the postTimeCard transaction", async () => {
            fakeTransactions.postTimeCard.resolves();
            const timeCard = generateTimeCard();

            await processTransaction(["TimeCard", `${timeCard.employeeId}`, `${timeCard.date}`, `${timeCard.hours}`]);

            expect(fakeTransactions.postTimeCard).to.have.been.calledOnceWith(
                `${timeCard.employeeId}`,
                `${timeCard.date}`,
                `${timeCard.hours}`
            );
        });
    });
    describe("SalesReceipt", () => {
        it("should call the postSalesReceipt transaction", async () => {
            fakeTransactions.postSalesReceipt.resolves();
            const salesReceipt = generateSalesReceipt();

            await processTransaction([
                "SalesReceipt",
                `${salesReceipt.employeeId}`,
                `${salesReceipt.date}`,
                `${salesReceipt.amount}`
            ]);

            expect(fakeTransactions.postSalesReceipt).to.have.been.calledOnceWith(
                `${salesReceipt.employeeId}`,
                `${salesReceipt.date}`,
                `${salesReceipt.amount}`
            );
        });
    });
    describe("ServiceCharge", () => {
        it("should call the postServiceCharge transaction", async () => {
            fakeTransactions.postServiceCharge.resolves();
            const serviceCharge = generateServiceCharge();

            await processTransaction(["ServiceCharge", `${serviceCharge.memberId}`, `${serviceCharge.amount}`]);

            expect(fakeTransactions.postServiceCharge).to.have.been.calledOnceWith(
                `${serviceCharge.memberId}`,
                `${serviceCharge.amount}`
            );
        });
    });
    describe("ChgEmp", () => {
        it("should call the changeEmployee's name transaction", async () => {
            fakeTransactions.changeEmployee.resolves();
            const employee = generateHourlyEmployee();

            await processTransaction(["ChgEmp", `${employee.id}`, "Name", "James Bond"]);

            expect(fakeTransactions.changeEmployee).to.have.been.calledOnceWith(`${employee.id}`, "Name", "James Bond");
        });
    });
});
