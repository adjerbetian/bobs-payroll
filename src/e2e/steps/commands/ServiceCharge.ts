import { executePayrollCommand } from "@test/cucumber";
import { When } from "cucumber";
import { store } from "../../utils";

When("I execute the ServiceCharge command on {string}", async (name: string) => {
    const serviceCharge = store.serviceCharges.get(name);
    await executePayrollCommand(`ServiceCharge ${serviceCharge.getMemberId()} ${serviceCharge.getAmount()}`);
});
When("I execute an incomplete ServiceCharge command on {string}", async (name: string) => {
    const serviceCharge = store.serviceCharges.get(name);
    await executePayrollCommand(`ServiceCharge ${serviceCharge.getMemberId()}`);
});
