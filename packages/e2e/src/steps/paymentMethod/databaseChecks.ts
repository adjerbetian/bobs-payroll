import { dbPaymentMethods } from "@modules/core";
import { expect } from "@infra/test";
import { Then } from "cucumber";
import { store } from "../../utils";

Then(/^(\w+) should have the payment method (\w+)$/, async (employeeName: string, paymentMethodName: string) => {
    const employee = store.employees.get(employeeName);
    const paymentMethod = store.paymentMethods.get(paymentMethodName);

    const paymentMethodInDB = await dbPaymentMethods.fetch({ employeeId: employee.getId() });
    expect(paymentMethodInDB).entity.to.equal(paymentMethod);
});
