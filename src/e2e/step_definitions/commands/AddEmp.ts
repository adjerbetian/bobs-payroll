import { executePayrollCommand } from "@test/cucumber";
import { When } from "cucumber";
import { EmployeeType } from "../../../app";
import { store } from "../../utils";

When("I execute the AddEmp command on {string}", async (name: string) => {
    await executePayrollCommand(buildCommand());

    function buildCommand(): string {
        const employee = store.employees.get(name);
        if (employee.hasType(EmployeeType.HOURLY)) {
            return `AddEmp ${employee.getId()} "${employee.getName()}" "${employee.getAddress()}" H ${employee.getHourlyRate()}`;
        }
        if (employee.hasType(EmployeeType.SALARIED)) {
            return `AddEmp ${employee.getId()} "${employee.getName()}" "${employee.getAddress()}" S ${employee.getSalary()}`;
        }
        if (employee.hasType(EmployeeType.COMMISSIONED)) {
            return `AddEmp ${employee.getId()} "${employee.getName()}" "${employee.getAddress()}" C ${employee.getSalary()} ${employee.getCommissionRate()}`;
        }
        throw new Error("invalid type");
    }
});
When("I execute an incomplete AddEmp command on {string}", async (name: string) => {
    const employee = store.employees.get(name);
    await executePayrollCommand(`AddEmp ${employee.getId()} "${employee.getName()}" "${employee.getAddress()}"`);
});
