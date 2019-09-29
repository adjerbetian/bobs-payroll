import { expect } from "@test/utils";
import { Then } from "cucumber";
import { dbPaymentMethods } from "../../../app";
import { store } from "../../utils";

Then("{string} should have the payment method {string}", async (employeeName: string, paymentMethodName: string) => {
    const employee = store.employees.get(employeeName);
    const paymentMethod = store.paymentMethods.get(paymentMethodName);

    const paymentMethodInDB = await dbPaymentMethods.fetch({ employeeId: employee.getId() });
    expect(paymentMethodInDB).entity.to.equal(paymentMethod);
});
