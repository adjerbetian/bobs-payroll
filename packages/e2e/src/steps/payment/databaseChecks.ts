import { Then } from "cucumber";
import { dbPayments } from "../../../payment";
import { expect } from "../../../test/utils";
import { dates, store } from "../../utils";

Then(
    /(\w+) should (not )?have been paid on (?:the )?([^0-9]{0,30})(?: of an amount of (.+|\d+))?(?: with the method (\w+))?$/,
    async (
        name: string,
        isNegated: string | undefined,
        day: string,
        amountExpression: string | undefined,
        paymentMethodName: string | undefined
    ) => {
        await checkWasPaid();
        await checkPaymentAmount();
        await checkPaymentMethod();

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
        async function checkPaymentMethod(): Promise<void> {
            if (!paymentMethodName) return;

            const paymentMethod = store.paymentMethods.get(paymentMethodName);
            const payment = await dbPayments.fetch({
                employeeId: getEmployeeId(),
                date: getDate()
            });
            expect(payment.getMethod()).entity.to.equal(paymentMethod);
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
