import {
    buildStubFor,
    expect,
    generateHourlyEmployee,
    generateIndex,
    generateSalesReceipt,
    generateServiceCharge,
    generateTimeCard,
    Stub
} from "@test/unit";
import { isoDate } from "../../../utils";
import { buildProcessTransaction, Transactions } from "./processTransaction";

describe("processTransaction", () => {
    let processTransaction: ReturnType<typeof buildProcessTransaction>;
    let stubbedTransactions: Stub<Transactions>;

    beforeEach(() => {
        stubbedTransactions = buildStubTransactions();
        processTransaction = buildProcessTransaction(stubbedTransactions);
    });

    describe("AddEmp", () => {
        it("should call the addEmployee transaction", async () => {
            stubbedTransactions.addEmployee.resolves();
            const employee = generateHourlyEmployee();

            await processTransaction([
                "AddEmp",
                `${employee.id}`,
                `"${employee.name}"`,
                `"${employee.address}"`,
                "H",
                `${employee.work.hourlyRate}`
            ]);

            expect(stubbedTransactions.addEmployee).to.have.been.calledOnceWith(
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
            stubbedTransactions.deleteEmployee.resolves();
            const employeeId = generateIndex();

            await processTransaction(["DelEmp", `${employeeId}`]);

            expect(stubbedTransactions.deleteEmployee).to.have.been.calledOnceWith(`${employeeId}`);
        });
    });
    describe("TimeCard", () => {
        it("should call the postTimeCard transaction", async () => {
            stubbedTransactions.postTimeCard.resolves();
            const timeCard = generateTimeCard();

            await processTransaction(["TimeCard", `${timeCard.employeeId}`, `${timeCard.date}`, `${timeCard.hours}`]);

            expect(stubbedTransactions.postTimeCard).to.have.been.calledOnceWith(
                `${timeCard.employeeId}`,
                `${timeCard.date}`,
                `${timeCard.hours}`
            );
        });
    });
    describe("SalesReceipt", () => {
        it("should call the postSalesReceipt transaction", async () => {
            stubbedTransactions.postSalesReceipt.resolves();
            const salesReceipt = generateSalesReceipt();

            await processTransaction([
                "SalesReceipt",
                `${salesReceipt.employeeId}`,
                `${salesReceipt.date}`,
                `${salesReceipt.amount}`
            ]);

            expect(stubbedTransactions.postSalesReceipt).to.have.been.calledOnceWith(
                `${salesReceipt.employeeId}`,
                `${salesReceipt.date}`,
                `${salesReceipt.amount}`
            );
        });
    });
    describe("ServiceCharge", () => {
        it("should call the postServiceCharge transaction", async () => {
            stubbedTransactions.postServiceCharge.resolves();
            const serviceCharge = generateServiceCharge();

            await processTransaction(["ServiceCharge", `${serviceCharge.memberId}`, `${serviceCharge.amount}`]);

            expect(stubbedTransactions.postServiceCharge).to.have.been.calledOnceWith(
                `${serviceCharge.memberId}`,
                `${serviceCharge.amount}`
            );
        });
    });
    describe("ChgEmp", () => {
        it("should call the changeEmployee transaction", async () => {
            stubbedTransactions.changeEmployee.resolves();
            const employee = generateHourlyEmployee();

            await processTransaction(["ChgEmp", `${employee.id}`, "Name", "James Bond"]);

            expect(stubbedTransactions.changeEmployee).to.have.been.calledOnceWith(
                `${employee.id}`,
                "Name",
                "James Bond"
            );
        });
    });
    describe("Payroll", () => {
        it("should call the runPayroll transaction", async () => {
            stubbedTransactions.runPayroll.resolves();
            const date = isoDate();

            await processTransaction(["Payroll", `${date}`]);

            expect(stubbedTransactions.runPayroll).to.have.been.calledOnceWith(`${date}`);
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
