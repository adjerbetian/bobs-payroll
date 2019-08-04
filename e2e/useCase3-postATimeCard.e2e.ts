import { executePayrollCommand, expect } from "../test/e2eTest";
import {
    generateHourlyRateEmployee,
    generateMonthlySalaryEmployee,
    generateTimeCard
} from "../test/generators";
import { employeeRepository, timeCardRepository } from "../src/mongo";

describe.only("Use Case 3: Post a Time Card", () => {
    it("should insert the time card in the db", async () => {
        const employee = generateHourlyRateEmployee();
        await employeeRepository.insertOne(employee);
        const timeCard = generateTimeCard({ employeeId: employee.id });

        await executePayrollCommand(`TimeCard ${employee.id} ${timeCard.date} ${timeCard.hours}`);

        const timeCards = await timeCardRepository.fetchAllOfEmployee(employee.id);
        expect(timeCards).to.deep.equal([timeCard]);
    });
    it("should do nothing when the employee is not an hourly employee", async () => {
        const employee = generateMonthlySalaryEmployee();
        await employeeRepository.insertOne(employee);
        const timeCard = generateTimeCard({ employeeId: employee.id });

        await executePayrollCommand(`TimeCard ${employee.id} ${timeCard.date} ${timeCard.hours}`);

        const timeCards = await timeCardRepository.fetchAllOfEmployee(employee.id);
        expect(timeCards).to.be.empty;
    });
    it("should do nothing when the employee does not exist", async () => {});
    it("should do nothing when the transaction if not of the right format", async () => {});
});
