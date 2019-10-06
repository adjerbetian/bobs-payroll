import { When } from "cucumber";
import { dates, executePayrollCommand } from "../../utils";

When(/^I execute the Payday command on (?:the )?(.+)$/, async (day: string) => {
    await executePayrollCommand(`Payday ${dates.get(day)}`);
});
