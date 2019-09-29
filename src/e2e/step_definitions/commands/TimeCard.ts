import { executePayrollCommand } from "@test/cucumber";
import { When } from "cucumber";
import { store } from "../../utils";

When("I execute the TimeCard command on {string}", async (name: string) => {
    const timeCard = store.timeCards.get(name);
    await executePayrollCommand(`TimeCard ${timeCard.getEmployeeId()} ${timeCard.getDate()} ${timeCard.getHours()}`);
});
When("I execute an incomplete TimeCard command on {string}", async (name: string) => {
    const timeCard = store.timeCards.get(name);
    await executePayrollCommand(`TimeCard ${timeCard.getEmployeeId()} ${timeCard.getDate()}`);
});
