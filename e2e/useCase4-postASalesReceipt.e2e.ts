import { dbModelGenerators, dbModelSeeders, executePayrollCommand, expect } from "@test/e2e";
import { dbSalesReceipts, SalesReceiptDBModel } from "../src";

describe("Use Case 4: Post a Sales Receipt", () => {
    it("should insert the time card in the db", async () => {
        const employee = await dbModelSeeders.seedCommissionedEmployee();
        const salesReceipt = dbModelGenerators.generateSalesReceipt({ employeeId: employee.id });

        await executePostSalesReceipt(salesReceipt);

        await expectEmployeeToHaveSalesReceipt(employee.id, salesReceipt);
    });
    it("should do nothing when the employee is not commissioned", async () => {
        const employee = await dbModelSeeders.seedSalariedEmployee();
        const salesReceipt = dbModelGenerators.generateSalesReceipt({ employeeId: employee.id });

        await executePostSalesReceipt(salesReceipt);

        await expectEmployeeToHaveNoSalesReceipt(employee.id);
    });
    it("should do nothing when the employee does not exist", async () => {
        const salesReceipt = dbModelGenerators.generateSalesReceipt();

        await executePostSalesReceipt(salesReceipt);

        await expectEmployeeToHaveNoSalesReceipt(salesReceipt.employeeId);
    });
    it("should do nothing when the transaction is not of the right format", async () => {
        const employee = await dbModelSeeders.seedCommissionedEmployee();
        const salesReceipt = dbModelGenerators.generateSalesReceipt({ employeeId: employee.id });

        await executePayrollCommand(`TimeCard ${salesReceipt.employeeId} ${salesReceipt.amount} ${salesReceipt.date}`);

        await expectEmployeeToHaveNoSalesReceipt(employee.id);
    });
});

async function executePostSalesReceipt(salesReceipt: SalesReceiptDBModel): Promise<void> {
    await executePayrollCommand(`SalesReceipt ${salesReceipt.employeeId} ${salesReceipt.date} ${salesReceipt.amount}`);
}

async function expectEmployeeToHaveSalesReceipt(employeeId: number, salesReceipt: SalesReceiptDBModel): Promise<void> {
    const salesReceipts = await dbSalesReceipts.fetchAll({ employeeId });
    expect(salesReceipts).to.deep.include(salesReceipt);
}

async function expectEmployeeToHaveNoSalesReceipt(employeeId: number): Promise<void> {
    const salesReceipts = await dbSalesReceipts.fetchAll({ employeeId });
    expect(salesReceipts).to.be.empty;
}
