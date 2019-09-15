import { generators, seeders, executePayrollCommand, expect } from "@test/e2e";
import { dbSalesReceipts, SalesReceipt } from "../src";

describe("Use Case 4: Post a Sales Receipt", () => {
    it("should insert the time card in the db", async () => {
        const employee = await seeders.seedCommissionedEmployee();
        const salesReceipt = generators.generateSalesReceipt({ employeeId: employee.getId() });

        await executePostSalesReceipt(salesReceipt);

        await expectEmployeeToHaveSalesReceipt(employee.getId(), salesReceipt);
    });
    it("should do nothing when the employee is not commissioned", async () => {
        const employee = await seeders.seedSalariedEmployee();
        const salesReceipt = generators.generateSalesReceipt({ employeeId: employee.getId() });

        await executePostSalesReceipt(salesReceipt);

        await expectEmployeeToHaveNoSalesReceipt(employee.getId());
    });
    it("should do nothing when the employee does not exist", async () => {
        const salesReceipt = generators.generateSalesReceipt();

        await executePostSalesReceipt(salesReceipt);

        await expectEmployeeToHaveNoSalesReceipt(salesReceipt.getEmployeeId());
    });
    it("should do nothing when the transaction is not of the right format", async () => {
        const employee = await seeders.seedCommissionedEmployee();
        const salesReceipt = generators.generateSalesReceipt({ employeeId: employee.getId() });

        await executePayrollCommand(
            `TimeCard ${salesReceipt.getEmployeeId()} ${salesReceipt.getAmount()} ${salesReceipt.getDate()}`
        );

        await expectEmployeeToHaveNoSalesReceipt(employee.getId());
    });
});

async function executePostSalesReceipt(salesReceipt: SalesReceipt): Promise<void> {
    await executePayrollCommand(
        `SalesReceipt ${salesReceipt.getEmployeeId()} ${salesReceipt.getDate()} ${salesReceipt.getAmount()}`
    );
}

async function expectEmployeeToHaveSalesReceipt(employeeId: number, salesReceipt: SalesReceipt): Promise<void> {
    const salesReceipts = await dbSalesReceipts.fetchAll({ employeeId });
    expect(salesReceipts).entities.to.include(salesReceipt);
}

async function expectEmployeeToHaveNoSalesReceipt(employeeId: number): Promise<void> {
    const salesReceipts = await dbSalesReceipts.fetchAll({ employeeId });
    expect(salesReceipts).to.be.empty;
}
