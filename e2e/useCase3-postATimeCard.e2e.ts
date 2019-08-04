import { executePayrollCommand, expect } from "../test/e2eTest";
import {
    generateHourlyRateEmployee,
    generateMonthlySalaryEmployee,
    generateTimeCard
} from "../test/generators";
import { employeeRepository, timeCardRepository } from "../src/mongo";
import { TimeCard } from "../src/entities";

describe("Use Case 3: Post a Time Card", () => {
    it("should insert the time card in the db", async () => {
        const employee = generateHourlyRateEmployee();
        await employeeRepository.insertOne(employee);
        const timeCard = generateTimeCard({ employeeId: employee.id });

        await executePostTimeCard(timeCard);

        const timeCards = await timeCardRepository.fetchAllOfEmployee(timeCard.employeeId);
        expect(timeCards).to.deep.equal([timeCard]);
    });
    it("should do nothing when the employee is not an hourly employee", async () => {
        const employee = generateMonthlySalaryEmployee();
        await employeeRepository.insertOne(employee);
        const timeCard = generateTimeCard({ employeeId: employee.id });

        await executePostTimeCard(timeCard);

        const timeCards = await timeCardRepository.fetchAllOfEmployee(timeCard.employeeId);
        expect(timeCards).to.be.empty;
    });
    it("should do nothing when the employee does not exist", async () => {
        const timeCard = generateTimeCard();

        await executePostTimeCard(timeCard);

        const timeCards = await timeCardRepository.fetchAllOfEmployee(timeCard.employeeId);
        expect(timeCards).to.be.empty;
    });
    it("should do nothing when the transaction if not of the right format", async () => {
        const employee = generateHourlyRateEmployee();
        await employeeRepository.insertOne(employee);
        const timeCard = generateTimeCard({ employeeId: employee.id });

        await executePayrollCommand(
            `TimeCard ${timeCard.employeeId} ${timeCard.hours} ${timeCard.date}`
        );

        const timeCards = await timeCardRepository.fetchAllOfEmployee(timeCard.employeeId);
        expect(timeCards).to.be.empty;
    });

    async function executePostTimeCard(timeCard: TimeCard): Promise<void> {
        await executePayrollCommand(
            `TimeCard ${timeCard.employeeId} ${timeCard.date} ${timeCard.hours}`
        );
    }
});
