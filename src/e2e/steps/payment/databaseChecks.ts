import { expect } from "@test/utils";
import { Then } from "cucumber";
import { dbPayments } from "../../../app";
import { dates, store } from "../../utils";

Then(
    "{string} should have been paid on (the ){string} of an amount of {string}",
    async (name: string, day: string, amountExpression: string) => {
        const employee = store.employees.get(name);
        const date = dates.get(day);
        const amount = eval(amountExpression);

        const payment = await dbPayments.fetch({
            employeeId: employee.getId(),
            date
        });
        expect(payment.getAmount()).to.equal(amount);
    }
);
Then("{string} should not have been paid on (the ){string}", async (name: string, day: string) => {
    const employee = store.employees.get(name);
    const date = dates.get(day);

    const wasPaid = await dbPayments.exists({
        employeeId: employee.getId(),
        date
    });
    expect(wasPaid).to.be.false;
});
