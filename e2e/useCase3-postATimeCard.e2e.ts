import { dbModelGenerators, dbModelSeeders, executePayrollCommand, expect } from "@test/e2e";
import { dbTimeCards, TimeCardDBModel } from "../src";

describe("Use Case 3: Post a Time Card", () => {
    it("should insert the time card in the db", async () => {
        const employee = await dbModelSeeders.seedHourlyEmployee();
        const timeCard = dbModelGenerators.generateTimeCard({ employeeId: employee.id });

        await executePostTimeCard(timeCard);

        await expectEmployeeToHaveTimeCard(employee.id, timeCard);
    });
    it("should do nothing when the employee is an hourly employee", async () => {
        const employee = await dbModelSeeders.seedSalariedEmployee();
        const timeCard = dbModelGenerators.generateTimeCard({ employeeId: employee.id });

        await executePostTimeCard(timeCard);

        await expectEmployeeToHaveNoTimeCards(employee.id);
    });
    it("should do nothing when the employee does not exist", async () => {
        const timeCard = dbModelGenerators.generateTimeCard();

        await executePostTimeCard(timeCard);

        await expectEmployeeToHaveNoTimeCards(timeCard.employeeId);
    });
    it("should do nothing when the transaction is not of the right format", async () => {
        const employee = await dbModelSeeders.seedHourlyEmployee();
        const timeCard = dbModelGenerators.generateTimeCard({ employeeId: employee.id });

        await executePayrollCommand(`TimeCard ${timeCard.employeeId} ${timeCard.hours} ${timeCard.date}`);

        await expectEmployeeToHaveNoTimeCards(timeCard.employeeId);
    });
});

async function executePostTimeCard(timeCard: TimeCardDBModel): Promise<void> {
    await executePayrollCommand(`TimeCard ${timeCard.employeeId} ${timeCard.date} ${timeCard.hours}`);
}

async function expectEmployeeToHaveTimeCard(employeeId: number, timeCard: TimeCardDBModel): Promise<void> {
    const timeCards = await dbTimeCards.fetchAll({ employeeId });
    expect(timeCards).to.deep.include(timeCard);
}

async function expectEmployeeToHaveNoTimeCards(employeeId: number): Promise<void> {
    const timeCards = await dbTimeCards.fetchAll({ employeeId });
    expect(timeCards).to.be.empty;
}
