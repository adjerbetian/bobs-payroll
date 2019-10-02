import { expect } from "@test/utils";
import { Then } from "cucumber";
import { dbPayments } from "../../../app";
import { dates, store } from "../../utils";

Then(
    /(\w+) should (not )?have been paid on (?:the )?([^"]+)(?: of an amount of "(.+)")?$/,
    async (name: string, isNegated: string | undefined, day: string, amountExpression: string | undefined) => {
        await checkWasPaid();
        await checkPaymentAmount();

        async function checkWasPaid(): Promise<void> {
            const wasPaid = await dbPayments.exists({
                employeeId: getEmployeeId(),
                date: getDate()
            });
            if (isNegated) expect(wasPaid).to.be.false;
            else expect(wasPaid).to.be.true;
        }
        async function checkPaymentAmount(): Promise<void> {
            if (!amountExpression) return;

            const amount = eval(amountExpression);
            const payment = await dbPayments.fetch({
                employeeId: getEmployeeId(),
                date: getDate()
            });
            expect(payment.getAmount()).to.equal(amount);
        }

        function getEmployeeId(): number {
            const employee = store.employees.get(name);
            return employee.getId();
        }
        function getDate(): string {
            return dates.get(day);
        }
    }
);
