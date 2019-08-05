import { executePayrollCommand, expect } from "../test/e2eTest";
import { generateMonthlySalaryEmployee, generateSalesReceipt } from "../test/generators";
import { employeeRepository } from "../src/mongo";
import { SalesReceipt } from "../src/entities";
import { salesReceiptRepository } from "../src/mongo/salesReceiptRepository";

describe("Use Case 4: Post a Sales Receipt", () => {
    it("should insert the time card in the db", async () => {
        const employee = generateMonthlySalaryEmployee({ commissionRate: 10 });
        await employeeRepository.insertOne(employee);
        const salesReceipt = generateSalesReceipt({ employeeId: employee.id });

        await executePostSalesReceipt(salesReceipt);

        const salesReceipts = await salesReceiptRepository.fetchAllOfEmployee(
            salesReceipt.employeeId
        );
        expect(salesReceipts).to.deep.equal([salesReceipt]);
    });
    it("should do nothing when the employee is not commissioned", async () => {
        const employee = generateMonthlySalaryEmployee();
        await employeeRepository.insertOne(employee);
        const salesReceipt = generateSalesReceipt({ employeeId: employee.id });

        await executePostSalesReceipt(salesReceipt);

        const timeCards = await salesReceiptRepository.fetchAllOfEmployee(salesReceipt.employeeId);
        expect(timeCards).to.be.empty;
    });
    it("should do nothing when the employee does not exist", async () => {
        const salesReceipt = generateSalesReceipt();

        await executePostSalesReceipt(salesReceipt);

        const salesReceipts = await salesReceiptRepository.fetchAllOfEmployee(
            salesReceipt.employeeId
        );
        expect(salesReceipts).to.be.empty;
    });
    it("should do nothing when the transaction is not of the right format", async () => {
        const employee = generateMonthlySalaryEmployee({ commissionRate: 10 });
        await employeeRepository.insertOne(employee);
        const salesReceipt = generateSalesReceipt({ employeeId: employee.id });

        await executePayrollCommand(
            `TimeCard ${salesReceipt.employeeId} ${salesReceipt.amount} ${salesReceipt.date}`
        );

        const salesReceipts = await salesReceiptRepository.fetchAllOfEmployee(
            salesReceipt.employeeId
        );
        expect(salesReceipts).to.be.empty;
    });

    async function executePostSalesReceipt(salesReceipt: SalesReceipt): Promise<void> {
        await executePayrollCommand(
            `SalesReceipt ${salesReceipt.employeeId} ${salesReceipt.date} ${salesReceipt.amount}`
        );
    }
});
