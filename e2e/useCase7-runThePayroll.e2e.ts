import {
    endOfLastMonth,
    executePayrollCommand,
    expect,
    firstDayOfLastMonth,
    firstDayOfMonth,
    friday,
    generateHoldPaymentMethod,
    lastDayOfMonth,
    lastFriday,
    lastMonday,
    lastTuesday,
    monday,
    never,
    secondDayOfMonth,
    seedCommissionedEmployee,
    seedDirectPaymentMethod,
    seedHourlyEmployee,
    seedPayment,
    seedSalariedEmployee,
    seedSalesReceipt,
    seedTimeCard,
    seedUnionMember,
    thursday,
    tuesday,
    wednesday
} from "@test/e2e";
import * as moment from "moment";
import { CommissionedEmployee, dbPayments, HourlyEmployee, SalariedEmployee } from "../src";

describe("Use Case 7: Run the Payroll for Today", () => {
    describe("hourly employees", () => {
        let employee: HourlyEmployee;

        beforeEach(async () => {
            employee = await seedHourlyEmployee();
        });

        it("should pay the hours made in the employee's time cards", async () => {
            const timeCards = [
                await seedTimeCard({ date: monday, hours: 5, employeeId: employee.id }),
                await seedTimeCard({ date: tuesday, hours: 6, employeeId: employee.id })
            ];

            await executePayrollCommand(`Payroll ${friday}`);

            await expectEmployeePaymentAmountToEqual(
                employee.id,
                (timeCards[0].hours + timeCards[1].hours) * employee.work.hourlyRate
            );
        });
        it("should not include the time cards already paid", async () => {
            await seedTimeCard({ date: lastMonday, hours: 5, employeeId: employee.id });
            await seedPayment({ employeeId: employee.id, date: lastFriday, amount: 666 });
            const newTimeCard = await seedTimeCard({ date: tuesday, hours: 6, employeeId: employee.id });

            await executePayrollCommand(`Payroll ${friday}`);

            await expectEmployeePaymentAmountToEqual(employee.id, newTimeCard.hours * employee.work.hourlyRate);
        });
        it("should not pay if it's not Friday", async () => {
            await seedTimeCard({ date: monday, hours: 5, employeeId: employee.id });

            await executePayrollCommand(`Payroll ${monday}`);

            await expectEmployeeNotToHaveBeenPaid(employee.id);
        });
        it("should pay 1.5 time the normal rate for extra hours (>8h a day)", async () => {
            const regularHours = 8;
            const extraHour = 4;
            await seedTimeCard({ date: monday, hours: regularHours + extraHour, employeeId: employee.id });

            await executePayrollCommand(`Payroll ${friday}`);

            await expectEmployeePaymentAmountToEqual(
                employee.id,
                (regularHours + 1.5 * extraHour) * employee.work.hourlyRate
            );
        });
        it("work on a complex example", async () => {
            const seed1 = await seedComplexHourlyEmployee1();
            const seed2 = await seedComplexHourlyEmployee2();

            await executePayrollCommand(`Payroll ${friday}`);

            await expectEmployeePaymentAmountToEqual(seed1.employee.id, seed1.amount);
            await expectEmployeePaymentAmountToEqual(seed2.employee.id, seed2.amount);

            async function seedComplexHourlyEmployee1(): Promise<{ employee: HourlyEmployee; amount: number }> {
                employee = await seedHourlyEmployee();
                await seedPreviousPayment(employee.id);
                await seedTimeCard({ date: monday, hours: 8 + 2, employeeId: employee.id });
                await seedTimeCard({ date: tuesday, hours: 4, employeeId: employee.id });
                await seedTimeCard({ date: wednesday, hours: 5, employeeId: employee.id });
                await seedTimeCard({ date: thursday, hours: 8 + 4, employeeId: employee.id });
                await seedTimeCard({ date: friday, hours: 1, employeeId: employee.id });

                const regularHours = 8 + 4 + 5 + 8 + 1;
                const extraHours = 2 + 4;
                const amount = employee.work.hourlyRate * (regularHours + 1.5 * extraHours);
                return { employee, amount };
            }
            async function seedComplexHourlyEmployee2(): Promise<{ employee: HourlyEmployee; amount: number }> {
                employee = await seedHourlyEmployee();
                await seedPreviousPayment(employee.id);
                await seedTimeCard({ date: monday, hours: 5, employeeId: employee.id });
                await seedTimeCard({ date: tuesday, hours: 8, employeeId: employee.id });
                await seedTimeCard({ date: wednesday, hours: 8 + 4, employeeId: employee.id });
                await seedTimeCard({ date: thursday, hours: 8 + 3, employeeId: employee.id });
                await seedTimeCard({ date: friday, hours: 0.5, employeeId: employee.id });

                const regularHours = 5 + 8 + 8 + 8 + 0.5;
                const extraHours = 4 + 3;
                const amount = employee.work.hourlyRate * (regularHours + 1.5 * extraHours);
                return { employee, amount };
            }
            async function seedPreviousPayment(employeeId: number): Promise<void> {
                await seedTimeCard({ date: lastMonday, hours: 5, employeeId });
                await seedTimeCard({ date: lastTuesday, hours: 12, employeeId });
                await seedPayment({ date: lastFriday, employeeId });
            }
        });
    });
    describe("salaried employees", () => {
        let employee: SalariedEmployee;

        beforeEach(async () => {
            employee = await seedSalariedEmployee();
        });

        it("should pay the monthly salary", async () => {
            await executePayrollCommand(`Payroll ${lastDayOfMonth}`);

            await expectEmployeePaymentAmountToEqual(employee.id, employee.work.monthlySalary);
        });
        it("should not pay if it's not the last day of the month", async () => {
            await executePayrollCommand(`Payroll ${firstDayOfMonth}`);

            await expectEmployeeNotToHaveBeenPaid(employee.id);
        });
    });
    describe("commissioned employees", () => {
        let employee: CommissionedEmployee;

        beforeEach(async () => {
            employee = await seedCommissionedEmployee();
        });

        it("should pay only the monthly salary when there are no sales receipt", async () => {
            await executePayrollCommand(`Payroll ${lastDayOfMonth}`);

            await expectEmployeePaymentAmountToEqual(employee.id, employee.work.monthlySalary);
        });
        it("should include the commissions of all the sales receipts", async () => {
            const salesReceipts = [
                await seedSalesReceipt({ employeeId: employee.id, date: firstDayOfMonth }),
                await seedSalesReceipt({ employeeId: employee.id, date: secondDayOfMonth })
            ];

            await executePayrollCommand(`Payroll ${lastDayOfMonth}`);

            const commission = (salesReceipts[0].amount + salesReceipts[1].amount) * employee.work.commissionRate;
            await expectEmployeePaymentAmountToEqual(employee.id, employee.work.monthlySalary + commission);
        });
        it("should not include the commissions of the sales receipts of the previous month", async () => {
            await seedSalesReceipt({ employeeId: employee.id, date: firstDayOfLastMonth });
            await seedPayment({ date: endOfLastMonth, employeeId: employee.id });

            await executePayrollCommand(`Payroll ${lastDayOfMonth}`);

            await expectEmployeePaymentAmountToEqual(employee.id, employee.work.monthlySalary);
        });
        it("should not pay if it's not the last day of the month", async () => {
            await seedSalesReceipt({ employeeId: employee.id, date: firstDayOfMonth });

            await executePayrollCommand(`Payroll ${secondDayOfMonth}`);

            await expectEmployeeNotToHaveBeenPaid(employee.id);
        });
    });
    describe("payment method", () => {
        it("should include the employee payment method", async () => {
            const employee = await seedSalariedEmployee();
            const paymentMethod = await seedDirectPaymentMethod({ employeeId: employee.id });

            await executePayrollCommand(`Payroll ${lastDayOfMonth}`);

            const payment = await dbPayments.fetchLast({ employeeId: employee.id });
            expect(payment.method).to.deep.equal(paymentMethod);
        });
        it("should include the hold payment method if not specified", async () => {
            const employee = await seedSalariedEmployee();

            await executePayrollCommand(`Payroll ${lastDayOfMonth}`);

            const expectedPaymentMethod = generateHoldPaymentMethod({ employeeId: employee.id });
            const payment = await dbPayments.fetchLast({ employeeId: employee.id });
            expect(payment.method).to.deep.equal(expectedPaymentMethod);
        });
    });
    describe("union", () => {
        it("should deduce the weekly dues rate from the salary", async () => {
            const employee = await seedSalariedEmployee();
            const unionMember = await seedUnionMember({ employeeId: employee.id });

            await executePayrollCommand(`Payroll ${lastDayOfMonth}`);

            const payment = await dbPayments.fetchLast({ employeeId: employee.id });
            const unionDues = employee.work.monthlySalary * unionMember.rate * nFridaysInMonth(firstDayOfMonth);
            expect(payment.amount).to.equal(employee.work.monthlySalary - unionDues);
        });
        it.skip("should deduce the weekly dues rate from the hourly payment", async () => {
            const employee = await seedHourlyEmployee();
            const timeCard = await seedTimeCard({ date: tuesday, hours: 6, employeeId: employee.id });
            const unionMember = await seedUnionMember({ employeeId: employee.id });

            await executePayrollCommand(`Payroll ${friday}`);

            const payment = await dbPayments.fetchLast({ employeeId: employee.id });
            const fullPaymentAmount = employee.work.hourlyRate * timeCard.hours;
            const unionDues = fullPaymentAmount * unionMember.rate;
            expect(payment.amount).to.equal(fullPaymentAmount - unionDues);
        });
        it.skip("should deduce the service charges", async () => {});
        it.skip("should not deduce the already paid service charges", async () => {});
    });
});

async function expectEmployeePaymentAmountToEqual(employeeId: number, amount: number): Promise<void> {
    const employeeLastPayment = await dbPayments.fetchLast({ employeeId });
    expect(employeeLastPayment.amount).to.equal(amount);
}
async function expectEmployeeNotToHaveBeenPaid(employeeId: number): Promise<void> {
    const paymentDate = await fetchEmployeeLastPaymentDate(employeeId);
    expect(paymentDate).to.equal(never);
}
async function fetchEmployeeLastPaymentDate(employeeId: number): Promise<string> {
    if (await dbPayments.exists({ employeeId })) {
        const payment = await dbPayments.fetchLast({ employeeId });
        return payment.date;
    } else {
        return never;
    }
}
function nFridaysInMonth(date: string): number {
    const start = moment(date).startOf("month");
    const end = moment(date).endOf("month");
    let n = 0;
    for (let d = moment(start); d.isSameOrBefore(end); d.add(1, "day")) {
        if (d.weekday() === 5) n++;
    }
    return n;
}
