import { executePayrollCommand, expect, generateTimeCard, seedHourlyEmployee, seedSalariedEmployee } from "@test/e2e";
import { dbTimeCards, TimeCard } from "../src";

describe("Use Case 3: Post a Time Card", () => {
    it("should insert the time card in the db", async () => {
        const employee = await seedHourlyEmployee();
        const timeCard = generateTimeCard({ employeeId: employee.id });

        await executePostTimeCard(timeCard);

        await expectEmployeeToHaveTimeCard(employee.id, timeCard);
    });
    it("should do nothing when the employee is an hourly employee", async () => {
        const employee = await seedSalariedEmployee();
        const timeCard = generateTimeCard({ employeeId: employee.id });

        await executePostTimeCard(timeCard);

        await expectEmployeeToHaveNoTimeCards(employee.id);
    });
    it("should do nothing when the employee does not exist", async () => {
        const timeCard = generateTimeCard();

        await executePostTimeCard(timeCard);

        await expectEmployeeToHaveNoTimeCards(timeCard.getEmployeeId());
    });
    it("should do nothing when the transaction is not of the right format", async () => {
        const employee = await seedHourlyEmployee();
        const timeCard = generateTimeCard({ employeeId: employee.id });

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
    expect(timeCards).to.deep.include(timeCard.toJSON());
}

async function expectEmployeeToHaveNoTimeCards(employeeId: number): Promise<void> {
    const timeCards = await dbTimeCards.fetchAll({ employeeId });
    expect(timeCards).to.be.empty;
}
