import {
    dbModelGenerators,
    dbModelSeeders,
    endOfLastMonth,
    executePayrollCommand,
    expect,
    firstDayOfLastMonth,
    firstDayOfMonth,
    friday,
    lastDayOfMonth,
    lastFriday,
    lastMonday,
    lastTuesday,
    monday,
    never,
    secondDayOfMonth,
    thursday,
    tuesday,
    wednesday
} from "@test/e2e";
import * as moment from "moment";
import { CommissionedEmployeeDBModel, dbPayments, HourlyEmployeeDBModel, SalariedEmployeeDBModel } from "../src";

describe("Use Case 7: Run the Payroll for Today", () => {
    describe("hourly employees", () => {
        let employee: HourlyEmployeeDBModel;

        beforeEach(async () => {
            employee = await dbModelSeeders.seedHourlyEmployee();
        });

        it("should pay the hours made in the employee's time cards", async () => {
            const timeCards = [
                await dbModelSeeders.seedTimeCard({ date: monday, hours: 5, employeeId: employee.id }),
                await dbModelSeeders.seedTimeCard({ date: tuesday, hours: 6, employeeId: employee.id })
            ];

            await executePayrollCommand(`Payroll ${friday}`);

            await expectEmployeePaymentAmountToEqual(
                employee.id,
                (timeCards[0].hours + timeCards[1].hours) * employee.hourlyRate
            );
        });
        it("should not include the time cards already paid", async () => {
            await dbModelSeeders.seedTimeCard({ date: lastMonday, hours: 5, employeeId: employee.id });
            await dbModelSeeders.seedPayment({ employeeId: employee.id, date: lastFriday, amount: 666 });
            const newTimeCard = await dbModelSeeders.seedTimeCard({ date: tuesday, hours: 6, employeeId: employee.id });

            await executePayrollCommand(`Payroll ${friday}`);

            await expectEmployeePaymentAmountToEqual(employee.id, newTimeCard.hours * employee.hourlyRate);
        });
        it("should not pay if it's not Friday", async () => {
            await dbModelSeeders.seedTimeCard({ date: monday, hours: 5, employeeId: employee.id });

            await executePayrollCommand(`Payroll ${monday}`);

            await expectEmployeeNotToHaveBeenPaid(employee.id);
        });
        it("should pay 1.5 time the normal rate for extra hours (>8h a day)", async () => {
            const regularHours = 8;
            const extraHour = 4;
            await dbModelSeeders.seedTimeCard({
                date: monday,
                hours: regularHours + extraHour,
                employeeId: employee.id
            });

            await executePayrollCommand(`Payroll ${friday}`);

            await expectEmployeePaymentAmountToEqual(
                employee.id,
                (regularHours + 1.5 * extraHour) * employee.hourlyRate
            );
        });
        it("work on a complex example", async () => {
            const seed1 = await seedComplexHourlyEmployee1();
            const seed2 = await seedComplexHourlyEmployee2();

            await executePayrollCommand(`Payroll ${friday}`);

            await expectEmployeePaymentAmountToEqual(seed1.employee.id, seed1.amount);
            await expectEmployeePaymentAmountToEqual(seed2.employee.id, seed2.amount);

            async function seedComplexHourlyEmployee1(): Promise<{ employee: HourlyEmployeeDBModel; amount: number }> {
                employee = await dbModelSeeders.seedHourlyEmployee();
                await seedPreviousPayment(employee.id);
                await dbModelSeeders.seedTimeCard({ date: monday, hours: 8 + 2, employeeId: employee.id });
                await dbModelSeeders.seedTimeCard({ date: tuesday, hours: 4, employeeId: employee.id });
                await dbModelSeeders.seedTimeCard({ date: wednesday, hours: 5, employeeId: employee.id });
                await dbModelSeeders.seedTimeCard({ date: thursday, hours: 8 + 4, employeeId: employee.id });
                await dbModelSeeders.seedTimeCard({ date: friday, hours: 1, employeeId: employee.id });

                const regularHours = 8 + 4 + 5 + 8 + 1;
                const extraHours = 2 + 4;
                const amount = employee.hourlyRate * (regularHours + 1.5 * extraHours);
                return { employee, amount };
            }
            async function seedComplexHourlyEmployee2(): Promise<{ employee: HourlyEmployeeDBModel; amount: number }> {
                employee = await dbModelSeeders.seedHourlyEmployee();
                await seedPreviousPayment(employee.id);
                await dbModelSeeders.seedTimeCard({ date: monday, hours: 5, employeeId: employee.id });
                await dbModelSeeders.seedTimeCard({ date: tuesday, hours: 8, employeeId: employee.id });
                await dbModelSeeders.seedTimeCard({ date: wednesday, hours: 8 + 4, employeeId: employee.id });
                await dbModelSeeders.seedTimeCard({ date: thursday, hours: 8 + 3, employeeId: employee.id });
                await dbModelSeeders.seedTimeCard({ date: friday, hours: 0.5, employeeId: employee.id });

                const regularHours = 5 + 8 + 8 + 8 + 0.5;
                const extraHours = 4 + 3;
                const amount = employee.hourlyRate * (regularHours + 1.5 * extraHours);
                return { employee, amount };
            }
            async function seedPreviousPayment(employeeId: number): Promise<void> {
                await dbModelSeeders.seedTimeCard({ date: lastMonday, hours: 5, employeeId });
                await dbModelSeeders.seedTimeCard({ date: lastTuesday, hours: 12, employeeId });
                await dbModelSeeders.seedPayment({ date: lastFriday, employeeId });
            }
        });
    });
    describe("salaried employees", () => {
        let employee: SalariedEmployeeDBModel;

        beforeEach(async () => {
            employee = await dbModelSeeders.seedSalariedEmployee();
        });

        it("should pay the monthly salary", async () => {
            await executePayrollCommand(`Payroll ${lastDayOfMonth}`);

            await expectEmployeePaymentAmountToEqual(employee.id, employee.salary);
        });
        it("should not pay if it's not the last day of the month", async () => {
            await executePayrollCommand(`Payroll ${firstDayOfMonth}`);

            await expectEmployeeNotToHaveBeenPaid(employee.id);
        });
    });
    describe("commissioned employees", () => {
        let employee: CommissionedEmployeeDBModel;

        beforeEach(async () => {
            employee = await dbModelSeeders.seedCommissionedEmployee();
        });

        it("should pay only the monthly salary when there are no sales receipt", async () => {
            await executePayrollCommand(`Payroll ${lastDayOfMonth}`);

            await expectEmployeePaymentAmountToEqual(employee.id, employee.salary);
        });
        it("should include the commissions of all the sales receipts", async () => {
            const salesReceipts = [
                await dbModelSeeders.seedSalesReceipt({ employeeId: employee.id, date: firstDayOfMonth }),
                await dbModelSeeders.seedSalesReceipt({ employeeId: employee.id, date: secondDayOfMonth })
            ];

            await executePayrollCommand(`Payroll ${lastDayOfMonth}`);

            const commission = (salesReceipts[0].amount + salesReceipts[1].amount) * employee.commissionRate;
            await expectEmployeePaymentAmountToEqual(employee.id, employee.salary + commission);
        });
        it("should not include the commissions of the sales receipts of the previous month", async () => {
            await dbModelSeeders.seedSalesReceipt({ employeeId: employee.id, date: firstDayOfLastMonth });
            await dbModelSeeders.seedPayment({ date: endOfLastMonth, employeeId: employee.id });

            await executePayrollCommand(`Payroll ${lastDayOfMonth}`);

            await expectEmployeePaymentAmountToEqual(employee.id, employee.salary);
        });
        it("should not pay if it's not the last day of the month", async () => {
            await dbModelSeeders.seedSalesReceipt({ employeeId: employee.id, date: firstDayOfMonth });

            await executePayrollCommand(`Payroll ${secondDayOfMonth}`);

            await expectEmployeeNotToHaveBeenPaid(employee.id);
        });
    });
    describe("payment method", () => {
        it("should include the employee payment method", async () => {
            const employee = await dbModelSeeders.seedSalariedEmployee();
            const paymentMethod = await dbModelSeeders.seedDirectPaymentMethod({ employeeId: employee.id });

            await executePayrollCommand(`Payroll ${lastDayOfMonth}`);

            const payment = await dbPayments.fetchLast({ employeeId: employee.id });
            expect(payment.method).to.deep.equal(paymentMethod);
        });
        it("should include the hold payment method if not specified", async () => {
            const employee = await dbModelSeeders.seedSalariedEmployee();

            await executePayrollCommand(`Payroll ${lastDayOfMonth}`);

            const expectedPaymentMethod = dbModelGenerators.generateHoldPaymentMethod({ employeeId: employee.id });
            const payment = await dbPayments.fetchLast({ employeeId: employee.id });
            expect(payment.method).to.deep.equal(expectedPaymentMethod);
        });
    });
    describe("union", () => {
        it.skip("should deduce the weekly dues rate from the salary", async () => {
            const employee = await dbModelSeeders.seedSalariedEmployee();
            const unionMember = await dbModelSeeders.seedUnionMember({ employeeId: employee.id });

            await executePayrollCommand(`Payroll ${lastDayOfMonth}`);

            const payment = await dbPayments.fetchLast({ employeeId: employee.id });
            const unionDues = employee.salary * unionMember.rate * nFridaysInMonth(firstDayOfMonth);
            expect(payment.amount).to.equal(employee.salary - unionDues);
        });
        it.skip("should deduce the weekly dues rate from the hourly payment", async () => {
            const employee = await dbModelSeeders.seedHourlyEmployee();
            const timeCard = await dbModelSeeders.seedTimeCard({ date: tuesday, hours: 6, employeeId: employee.id });
            const unionMember = await dbModelSeeders.seedUnionMember({ employeeId: employee.id });

            await executePayrollCommand(`Payroll ${friday}`);

            const payment = await dbPayments.fetchLast({ employeeId: employee.id });
            const fullPaymentAmount = employee.hourlyRate * timeCard.hours;
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
