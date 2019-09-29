import { executePayrollCommand } from "@test/cucumber";
import { When } from "cucumber";
import { store } from "../../utils";

When("I execute the DelEmp command on {string}", async (name: string) => {
    const employee = store.employees.get(name);
    await executePayrollCommand(`DelEmp ${employee.getId()}`);
});
