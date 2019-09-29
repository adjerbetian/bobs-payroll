import { executePayrollCommand, generateIndex } from "@test/cucumber";
import { When } from "cucumber";
import { EmployeeType } from "../../app";
import { store } from "../utils";

When("I execute the AddEmp command", async function() {
    await executePayrollCommand(buildCommand());

    function buildCommand(): string {
        const employee = store.employee;
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

When("I execute an incomplete AddEmp command", async function() {
    const employee = store.employee;
    await executePayrollCommand(`AddEmp ${employee.getId()} "${employee.getName()}" "${employee.getAddress()}"`);
});

When("I execute the DelEmp command", async function() {
    const employee = store.employee;
    await executePayrollCommand(`DelEmp ${employee.getId()}`);
});

When("I execute the DelEmp command on another employee", async function() {
    await executePayrollCommand(`DelEmp ${generateIndex()}`);
});

When("I execute the TimeCard command", async function() {
    const timeCard = store.timeCard;
    await executePayrollCommand(`TimeCard ${timeCard.getEmployeeId()} ${timeCard.getDate()} ${timeCard.getHours()}`);
});
