import {
    endOfLastMonth,
    generators,
    seeders,
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
import { CommissionedEmployee, dbPayments, HourlyEmployee, SalariedEmployee } from "../src";

describe("Use Case 7: Run the Payroll for Today", () => {
    describe("hourly employees", () => {
        let employee: HourlyEmployee;

        beforeEach(async () => {
            employee = await seeders.seedHourlyEmployee();
        });

        it("should pay the hours made in the employee's time cards", async () => {
            const timeCards = [
                await seeders.seedTimeCard({ date: monday, hours: 5, employeeId: employee.getId() }),
                await seeders.seedTimeCard({ date: tuesday, hours: 6, employeeId: employee.getId() })
            ];

            await executePayrollCommand(`Payday ${friday}`);

            await expectEmployeePaymentAmountToEqual(
                employee.getId(),
                (timeCards[0].getHours() + timeCards[1].getHours()) * employee.getHourlyRate()
            );
        });
        it("should not include the time cards already paid", async () => {
            await seeders.seedTimeCard({ date: lastMonday, hours: 5, employeeId: employee.getId() });
            await seeders.seedPayment({ employeeId: employee.getId(), date: lastFriday, amount: 666 });
            const newTimeCard = await seeders.seedTimeCard({
                date: tuesday,
                hours: 6,
                employeeId: employee.getId()
            });

            await executePayrollCommand(`Payday ${friday}`);

            await expectEmployeePaymentAmountToEqual(
                employee.getId(),
                newTimeCard.getHours() * employee.getHourlyRate()
            );
        });
        it("should not pay if it's not Friday", async () => {
            await seeders.seedTimeCard({ date: monday, hours: 5, employeeId: employee.getId() });

            await executePayrollCommand(`Payday ${monday}`);

            await expectEmployeeNotToHaveBeenPaid(employee.getId());
        });
        it("should pay 1.5 time the normal rate for extra hours (>8h a day)", async () => {
            const regularHours = 8;
            const extraHour = 4;
            await seeders.seedTimeCard({
                date: monday,
                hours: regularHours + extraHour,
                employeeId: employee.getId()
            });

            await executePayrollCommand(`Payday ${friday}`);

            await expectEmployeePaymentAmountToEqual(
                employee.getId(),
                (regularHours + 1.5 * extraHour) * employee.getHourlyRate()
            );
        });
        it("work on a complex example", async () => {
            const seed1 = await seedComplexHourlyEmployee1();
            const seed2 = await seedComplexHourlyEmployee2();

            await executePayrollCommand(`Payday ${friday}`);

            await expectEmployeePaymentAmountToEqual(seed1.employee.getId(), seed1.amount);
            await expectEmployeePaymentAmountToEqual(seed2.employee.getId(), seed2.amount);

            async function seedComplexHourlyEmployee1(): Promise<{ employee: HourlyEmployee; amount: number }> {
                employee = await seeders.seedHourlyEmployee();
                await seedPreviousPayment(employee.getId());
                await seeders.seedTimeCard({ date: monday, hours: 8 + 2, employeeId: employee.getId() });
                await seeders.seedTimeCard({ date: tuesday, hours: 4, employeeId: employee.getId() });
                await seeders.seedTimeCard({ date: wednesday, hours: 5, employeeId: employee.getId() });
                await seeders.seedTimeCard({ date: thursday, hours: 8 + 4, employeeId: employee.getId() });
                await seeders.seedTimeCard({ date: friday, hours: 1, employeeId: employee.getId() });

                const regularHours = 8 + 4 + 5 + 8 + 1;
                const extraHours = 2 + 4;
                const amount = employee.getHourlyRate() * (regularHours + 1.5 * extraHours);
                return { employee, amount };
            }
            async function seedComplexHourlyEmployee2(): Promise<{ employee: HourlyEmployee; amount: number }> {
                employee = await seeders.seedHourlyEmployee();
                await seedPreviousPayment(employee.getId());
                await seeders.seedTimeCard({ date: monday, hours: 5, employeeId: employee.getId() });
                await seeders.seedTimeCard({ date: tuesday, hours: 8, employeeId: employee.getId() });
                await seeders.seedTimeCard({ date: wednesday, hours: 8 + 4, employeeId: employee.getId() });
                await seeders.seedTimeCard({ date: thursday, hours: 8 + 3, employeeId: employee.getId() });
                await seeders.seedTimeCard({ date: friday, hours: 0.5, employeeId: employee.getId() });

                const regularHours = 5 + 8 + 8 + 8 + 0.5;
                const extraHours = 4 + 3;
                const amount = employee.getHourlyRate() * (regularHours + 1.5 * extraHours);
                return { employee, amount };
            }
            async function seedPreviousPayment(employeeId: number): Promise<void> {
                await seeders.seedTimeCard({ date: lastMonday, hours: 5, employeeId });
                await seeders.seedTimeCard({ date: lastTuesday, hours: 12, employeeId });
                await seeders.seedPayment({ date: lastFriday, employeeId });
            }
        });
    });
    describe("salaried employees", () => {
        let employee: SalariedEmployee;

        beforeEach(async () => {
            employee = await seeders.seedSalariedEmployee();
        });

        it("should pay the monthly salary", async () => {
            await executePayrollCommand(`Payday ${lastDayOfMonth}`);

            await expectEmployeePaymentAmountToEqual(employee.getId(), employee.getSalary());
        });
        it("should not pay if it's not the last day of the month", async () => {
            await executePayrollCommand(`Payday ${firstDayOfMonth}`);

            await expectEmployeeNotToHaveBeenPaid(employee.getId());
        });
    });
    describe("commissioned employees", () => {
        let employee: CommissionedEmployee;

        beforeEach(async () => {
            employee = await seeders.seedCommissionedEmployee();
        });

        it("should pay only the monthly salary when there are no sales receipt", async () => {
            await executePayrollCommand(`Payday ${lastDayOfMonth}`);

            await expectEmployeePaymentAmountToEqual(employee.getId(), employee.getSalary());
        });
        it("should include the commissions of all the sales receipts", async () => {
            const salesReceipts = [
                await seeders.seedSalesReceipt({ employeeId: employee.getId(), date: firstDayOfMonth }),
                await seeders.seedSalesReceipt({ employeeId: employee.getId(), date: secondDayOfMonth })
            ];

            await executePayrollCommand(`Payday ${lastDayOfMonth}`);

            const commission =
                (salesReceipts[0].getAmount() + salesReceipts[1].getAmount()) * employee.getCommissionRate();
            await expectEmployeePaymentAmountToEqual(employee.getId(), employee.getSalary() + commission);
        });
        it("should not include the commissions of the sales receipts of the previous month", async () => {
            await seeders.seedSalesReceipt({ employeeId: employee.getId(), date: firstDayOfLastMonth });
            await seeders.seedPayment({ date: endOfLastMonth, employeeId: employee.getId() });

            await executePayrollCommand(`Payday ${lastDayOfMonth}`);

            await expectEmployeePaymentAmountToEqual(employee.getId(), employee.getSalary());
        });
        it("should not pay if it's not the last day of the month", async () => {
            await seeders.seedSalesReceipt({ employeeId: employee.getId(), date: firstDayOfMonth });

            await executePayrollCommand(`Payday ${secondDayOfMonth}`);

            await expectEmployeeNotToHaveBeenPaid(employee.getId());
        });
    });
    describe("payment method", () => {
        it("should include the employee payment method", async () => {
            const employee = await seeders.seedSalariedEmployee();
            const paymentMethod = await seeders.seedDirectPaymentMethod({ employeeId: employee.getId() });

            await executePayrollCommand(`Payday ${lastDayOfMonth}`);

            const payment = await dbPayments.fetchLast({ employeeId: employee.getId() });
            expect(payment.getMethod()).entity.to.equal(paymentMethod);
        });
        it("should include the hold payment method if not specified", async () => {
            const employee = await seeders.seedSalariedEmployee();

            await executePayrollCommand(`Payday ${lastDayOfMonth}`);

            const expectedPaymentMethod = generators.generateHoldPaymentMethod({ employeeId: employee.getId() });
            const payment = await dbPayments.fetchLast({ employeeId: employee.getId() });
            expect(payment.getMethod()).entity.to.equal(expectedPaymentMethod);
        });
    });
    describe("union", () => {
        it("should deduce the weekly dues rate from the hourly payment", async () => {
            const employee = await seeders.seedHourlyEmployee();
            const timeCard = await seeders.seedTimeCard({
                date: tuesday,
                hours: 6,
                employeeId: employee.getId()
            });
            const unionMember = await seeders.seedUnionMember({ employeeId: employee.getId(), rate: 0.1 });

            await executePayrollCommand(`Payday ${friday}`);

            const payment = await dbPayments.fetchLast({ employeeId: employee.getId() });
            const fullPaymentAmount = employee.getHourlyRate() * timeCard.getHours();
            const unionDues = fullPaymentAmount * unionMember.getRate();
            expect(payment.getAmount()).to.equal(fullPaymentAmount - unionDues);
        });
        it.skip("should deduce the weekly dues rate from the salary", async () => {
            const employee = await seeders.seedSalariedEmployee();
            const unionMember = await seeders.seedUnionMember({ employeeId: employee.getId() });

            await executePayrollCommand(`Payday ${lastDayOfMonth}`);

            const payment = await dbPayments.fetchLast({ employeeId: employee.getId() });
            const unionDues = employee.getSalary() * unionMember.getRate() * nFridaysInMonth(firstDayOfMonth);
            expect(payment.getAmount()).to.equal(employee.getSalary() - unionDues);
        });
        it.skip("should deduce the service charges", async () => {});
        it.skip("should not deduce the already paid service charges", async () => {});
    });
});

async function expectEmployeePaymentAmountToEqual(employeeId: number, amount: number): Promise<void> {
    const employeeLastPayment = await dbPayments.fetchLast({ employeeId });
    expect(employeeLastPayment.getAmount()).to.equal(amount);
}
async function expectEmployeeNotToHaveBeenPaid(employeeId: number): Promise<void> {
    const paymentDate = await fetchEmployeeLastPaymentDate(employeeId);
    expect(paymentDate).to.equal(never);
}
async function fetchEmployeeLastPaymentDate(employeeId: number): Promise<string> {
    if (await dbPayments.exists({ employeeId })) {
        const payment = await dbPayments.fetchLast({ employeeId });
        return payment.getDate();
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
