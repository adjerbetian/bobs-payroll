import { executePayrollCommand } from "@test/cucumber";
import { When } from "cucumber";
import { dates } from "../../utils";

When("I execute the Payday command on (the ){string}", async (day: string) => {
    await executePayrollCommand(`Payday ${dates.get(day)}`);
});
