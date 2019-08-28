import * as moment from "moment";
import { mongoPaymentRepository } from "../src";
import { executePayrollCommand, expect } from "../test/e2eTest";
import { seedHourlyEmployee, seedTimeCard } from "../test/seeders";
import { isoDate } from "../test/utils";

const monday = isoDate(moment().startOf("week"));
const tuesday = isoDate(moment(monday).add(1, "day"));
const wednesday = isoDate(moment(monday).add(2, "day"));
const thursday = isoDate(moment(monday).add(3, "day"));
const friday = isoDate(moment(monday).add(4, "day"));

describe("Use Case 7: Run the Payroll for Today", () => {
    describe("hourly employees", () => {
        it("should pay the hours made in his time cards", async () => {
            const employee = await seedHourlyEmployee();
            const timeCards = [
                await seedTimeCard({ date: monday, hours: 5 }),
                await seedTimeCard({ date: tuesday, hours: 6 })
            ];

            await executePayrollCommand(`Payroll ${friday}`);

            const workedHours = timeCards.reduce((total, tc) => total + tc.hours, 0);
            const expectedPaymentAmount = workedHours * employee.work.hourlyRate;
            const employeeLastPayment = await mongoPaymentRepository.fetchLastOfEmployee(employee.id);
            expect(employeeLastPayment.amount).to.equal(expectedPaymentAmount);
        });
        it.skip("should not include the time cards already paid", async () => {});
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
});
