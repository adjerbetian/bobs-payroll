import { executePayrollCommand, expect } from "../test/e2eTest";
import { generateSalesReceipt } from "../test/generators";
import { SalesReceipt } from "../src/entities";
import { salesReceiptRepository } from "../src/mongo";
import { createCommissionedEmployee, createMonthlySalaryEmployee } from "../test/creators";

describe("Use Case 4: Post a Sales Receipt", () => {
    it("should insert the time card in the db", async () => {
        const employee = await createCommissionedEmployee();
        const salesReceipt = generateSalesReceipt({ employeeId: employee.id });

        await executePostSalesReceipt(salesReceipt);

        await expectEmployeeToHaveSalesReceipt(employee.id, salesReceipt);
    });
    it("should do nothing when the employee is not commissioned", async () => {
        const employee = await createMonthlySalaryEmployee();
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
        const employee = await createCommissionedEmployee();
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
    const dbSalesReceipts = await salesReceiptRepository.fetchAllOfEmployee(employeeId);
    expect(dbSalesReceipts).to.deep.include(salesReceipt);
}

async function expectEmployeeToHaveNoSalesReceipt(employeeId: number): Promise<void> {
    const dbSalesReceipts = await salesReceiptRepository.fetchAllOfEmployee(employeeId);
    expect(dbSalesReceipts).to.be.empty;
}
