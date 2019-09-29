import { generators, seeders, executePayrollCommand, expect } from "@test/e2e";
import { dbTimeCards, TimeCard } from "../app";

// --------------------------
// DEPRECATED
// --------------------------

describe("Use Case 3: Post a Time Card", () => {
    it("should insert the time card in the db", async () => {
        const employee = await seeders.seedHourlyEmployee();
        const timeCard = generators.generateTimeCard({ employeeId: employee.getId() });

        await executePostTimeCard(timeCard);

        await expectEmployeeToHaveTimeCard(employee.getId(), timeCard);
    });
    it("should do nothing when the employee is not an hourly employee", async () => {
        const employee = await seeders.seedSalariedEmployee();
        const timeCard = generators.generateTimeCard({ employeeId: employee.getId() });

        await executePostTimeCard(timeCard);

        await expectEmployeeToHaveNoTimeCards(employee.getId());
    });
    it("should do nothing when the employee does not exist", async () => {
        const timeCard = generators.generateTimeCard();

        await executePostTimeCard(timeCard);

        await expectEmployeeToHaveNoTimeCards(timeCard.getEmployeeId());
    });
    it("should do nothing when the transaction is not of the right format", async () => {
        const employee = await seeders.seedHourlyEmployee();
        const timeCard = generators.generateTimeCard({ employeeId: employee.getId() });

        await executePayrollCommand(
            `TimeCard ${timeCard.getEmployeeId()} ${timeCard.getHours()} ${timeCard.getDate()}`
        );

        await expectEmployeeToHaveNoTimeCards(timeCard.getEmployeeId());
    });
});

async function executePostTimeCard(timeCard: TimeCard): Promise<void> {
    await executePayrollCommand(`TimeCard ${timeCard.getEmployeeId()} ${timeCard.getDate()} ${timeCard.getHours()}`);
}

async function expectEmployeeToHaveTimeCard(employeeId: number, timeCard: TimeCard): Promise<void> {
    const timeCards = await dbTimeCards.fetchAll({ employeeId });
    expect(timeCards).entities.to.include(timeCard);
}

async function expectEmployeeToHaveNoTimeCards(employeeId: number): Promise<void> {
    const timeCards = await dbTimeCards.fetchAll({ employeeId });
    expect(timeCards).to.be.empty;
}
