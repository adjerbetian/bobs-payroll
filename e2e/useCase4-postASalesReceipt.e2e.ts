import { SalesReceipt, mongoSalesReceiptRepository } from "../src";
import { seedCommissionedEmployee, seedMonthlySalaryEmployee } from "../test/seeders";
import { executePayrollCommand, expect } from "../test/e2eTest";
import { generateSalesReceipt } from "../test/generators";

describe("Use Case 4: Post a Sales Receipt", () => {
    it("should insert the time card in the db", async () => {
        const employee = await seedCommissionedEmployee();
        const salesReceipt = generateSalesReceipt({ employeeId: employee.id });

        await executePostSalesReceipt(salesReceipt);

        await expectEmployeeToHaveSalesReceipt(employee.id, salesReceipt);
    });
    it("should do nothing when the employee is not commissioned", async () => {
        const employee = await seedMonthlySalaryEmployee();
        const salesReceipt = generateSalesReceipt({ employeeId: employee.id });

        await executePostSalesReceipt(salesReceipt);

        await expectEmployeeToHaveNoSalesReceipt(employee.id);
    });
    it("should do nothing when the employee does not exist", async () => {
        const salesReceipt = generateSalesReceipt();

        await executePostSalesReceipt(salesReceipt);

        await expectEmployeeToHaveNoSalesReceipt(salesReceipt.employeeId);
    });
    it("should do nothing when the transaction is not of the right format", async () => {
        const employee = await seedCommissionedEmployee();
        const salesReceipt = generateSalesReceipt({ employeeId: employee.id });

        await executePayrollCommand(
            `TimeCard ${salesReceipt.employeeId} ${salesReceipt.amount} ${salesReceipt.date}`
        );

        await expectEmployeeToHaveNoSalesReceipt(employee.id);
    });
});

async function executePostSalesReceipt(salesReceipt: SalesReceipt): Promise<void> {
    await executePayrollCommand(
        `SalesReceipt ${salesReceipt.employeeId} ${salesReceipt.date} ${salesReceipt.amount}`
    );
}

async function expectEmployeeToHaveSalesReceipt(
    employeeId: number,
    salesReceipt: SalesReceipt
): Promise<void> {
    const dbSalesReceipts = await mongoSalesReceiptRepository.fetchAllOfEmployee(employeeId);
    expect(dbSalesReceipts).to.deep.include(salesReceipt);
}

async function expectEmployeeToHaveNoSalesReceipt(employeeId: number): Promise<void> {
    const dbSalesReceipts = await mongoSalesReceiptRepository.fetchAllOfEmployee(employeeId);
    expect(dbSalesReceipts).to.be.empty;
}
