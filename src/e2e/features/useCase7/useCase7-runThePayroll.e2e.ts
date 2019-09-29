import {
    endOfLastMonth,
    executePayrollCommand,
    expect,
    firstDayOfLastMonth,
    firstDayOfMonth,
    friday,
    generators,
    lastDayOfMonth,
    never,
    secondDayOfMonth,
    seeders,
    tuesday
} from "@test/e2e";
import * as moment from "moment";
import { CommissionedEmployee, dbPayments } from "../../../app";

describe("Use Case 7: Run the Payroll for Today", () => {
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
        it("should specify the employee payment method", async () => {
            const employee = await seeders.seedSalariedEmployee();
            const paymentMethod = await seeders.seedDirectPaymentMethod({ employeeId: employee.getId() });

            await executePayrollCommand(`Payday ${lastDayOfMonth}`);

            const payment = await dbPayments.fetchLast({ employeeId: employee.getId() });
            expect(payment.getMethod()).entity.to.equal(paymentMethod);
        });
        it("should specify the hold payment method if not specified", async () => {
            const employee = await seeders.seedSalariedEmployee();

            await executePayrollCommand(`Payday ${lastDayOfMonth}`);

            const expectedPaymentMethod = generators.generateHoldPaymentMethod({ employeeId: employee.getId() });
            const payment = await dbPayments.fetchLast({ employeeId: employee.getId() });
            expect(payment.getMethod()).entity.to.equal(expectedPaymentMethod);
        });
    });
    describe("union", () => {
        it.skip("should deduce the weekly dues rate from the hourly payment", async () => {
            const employee = await seeders.seedHourlyEmployee({ hourlyRate: 15 });
            await seeders.seedTimeCard({
                date: tuesday,
                hours: 6,
                employeeId: employee.getId()
            });
            await seeders.seedUnionMember({ employeeId: employee.getId(), rate: 0.1 });

            await executePayrollCommand(`Payday ${friday}`);

            const payment = await dbPayments.fetchLast({ employeeId: employee.getId() });
            const fullPaymentAmount = 15 * 6;
            const unionDues = fullPaymentAmount * 0.1;
            expect(payment.getAmount()).to.equal(fullPaymentAmount - unionDues);
        });
        it.skip("should deduce the weekly dues rate from the salary", async () => {
            const employee = await seeders.seedSalariedEmployee({ salary: 3500 });
            await seeders.seedUnionMember({ employeeId: employee.getId(), rate: 0.1 });

            await executePayrollCommand(`Payday ${lastDayOfMonth}`);

            const payment = await dbPayments.fetchLast({ employeeId: employee.getId() });
            const unionDues = 3500 * 0.1 * nFridaysInMonth(firstDayOfMonth);
            expect(payment.getAmount()).to.equal(3500 - unionDues);
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
