import {
    executePayrollCommand,
    expect,
    friday,
    lastFriday,
    lastMonday,
    monday,
    seedHourlyEmployee,
    seedPayment,
    seedTimeCard,
    tuesday
} from "@test/e2e";
import { mongoPaymentRepository } from "../src";

describe("Use Case 7: Run the Payroll for Today", () => {
    describe("hourly employees", () => {
        it("should pay the hours made in the employee's time cards", async () => {
            const employee = await seedHourlyEmployee();
            const timeCards = [
                await seedTimeCard({ date: monday, hours: 5, employeeId: employee.id }),
                await seedTimeCard({ date: tuesday, hours: 6, employeeId: employee.id })
            ];

            await executePayrollCommand(`Payroll ${friday}`);

            const workedHours = timeCards.reduce((total, tc) => total + tc.hours, 0);
            const expectedPaymentAmount = workedHours * employee.work.hourlyRate;
            await expectPaymentAmountToBe(employee.id, expectedPaymentAmount);
        });
        it("should not include the time cards already paid", async () => {
            const employee = await seedHourlyEmployee();
            await seedTimeCard({ date: lastMonday, hours: 5, employeeId: employee.id });
            const newTimeCard = await seedTimeCard({ date: tuesday, hours: 6, employeeId: employee.id });
            await seedPayment({ employeeId: employee.id, date: lastFriday });

            await executePayrollCommand(`Payroll ${friday}`);

            const workedHours = newTimeCard.hours;
            const expectedPaymentAmount = workedHours * employee.work.hourlyRate;
            await expectPaymentAmountToBe(employee.id, expectedPaymentAmount);
        });
        it.skip("should not pay if it's not Friday", async () => {});
        it.skip("should pay 1.5 time the normal rate for extra hours (>8h a day)", async () => {});
        it.skip("work on a complex example", async () => {});
    });
    describe("salaried employees", () => {
        it.skip("should pay the monthly salary", async () => {});
        it.skip("should not pay if it's not the last day of the month", async () => {});
    });
    describe("salaried employees", () => {
        it.skip("should pay the monthly salary", async () => {});
        it.skip("should not pay if it's not the last day of the month", async () => {});
        it.skip("should not pay twice even if we run the program twice on the same day", async () => {});
    });
    describe("commissioned employees", () => {
        it.skip("should pay only the monthly salary when there are no sales receipt", async () => {});
        it.skip("should include the commissions of all the sales receipts", async () => {});
        it.skip("should not include the commissions of the sales receipts of the previous month", async () => {});
        it.skip("should not pay if it's not the last day of the month", async () => {});
        it.skip("should not pay twice the salary and the commission even if we run the program twice on the same day", async () => {});
    });
    describe("payment method", () => {
        it.skip("should include the employee payment method", async () => {});
        it.skip("should include the hold payment method if not specified", async () => {});
    });
    describe("union", () => {
        it.skip("should deduce the weekly dues rate from the salary", async () => {});
        it.skip("should deduce the service charges", async () => {});
        it.skip("should not deduce the already paid service charges", async () => {});
    });

    async function expectPaymentAmountToBe(employeeId: number, amount: number): Promise<void> {
        const employeeLastPayment = await mongoPaymentRepository.fetchLastOfEmployee(employeeId);
        expect(employeeLastPayment.amount).to.equal(amount);
    }
});
