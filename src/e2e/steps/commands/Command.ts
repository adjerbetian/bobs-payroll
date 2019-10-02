import { executePayrollCommand } from "@test/cucumber";
import { When } from "cucumber";
import { EmployeeType } from "../../../app";
import { store } from "../../utils";

When(
    /^I execute the( incomplete)? (\w+) command on (\w+)$/,
    async (isIncomplete: string | undefined, commandName: string, name: string) => {
        let command = buildCommand(commandName, name);
        if (isIncomplete) {
            command = removeLastArg(command);
        }
        await executePayrollCommand(command);
    }
);

function buildCommand(commandName: string, name: string): string {
    if (commandName === "AddEmp") return buildAddEmpCommand();
    if (commandName === "DelEmp") return buildDelEmpCommand();
    if (commandName === "SalesReceipt") return buildSalesReceiptCommand();
    if (commandName === "TimeCard") return buildTimeCardCommand();
    if (commandName === "ServiceCharge") return buildServiceChargeCommand();
    throw new Error(`unknown command ${commandName}`);

    function buildAddEmpCommand(): string {
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

    function buildDelEmpCommand(): string {
        const employee = store.employees.get(name);
        return `DelEmp ${employee.getId()}`;
    }

    function buildSalesReceiptCommand(): string {
        const salesReceipt = store.salesReceipts.get(name);
        return `SalesReceipt ${salesReceipt.getEmployeeId()} ${salesReceipt.getDate()} ${salesReceipt.getAmount()}`;
    }

    function buildTimeCardCommand(): string {
        const timeCard = store.timeCards.get(name);
        return `TimeCard ${timeCard.getEmployeeId()} ${timeCard.getDate()} ${timeCard.getHours()}`;
    }

    function buildServiceChargeCommand(): string {
        const serviceCharge = store.serviceCharges.get(name);
        return `ServiceCharge ${serviceCharge.getMemberId()} ${serviceCharge.getAmount()}`;
    }
}

function removeLastArg(command: string): string {
    const parts = command.split(`"`);
    if (parts[parts.length - 1]) {
        return command
            .split(" ")
            .slice(0, -1)
            .join(" ");
    } else {
        return parts
            .slice(0, -1)
            .slice(0, -1)
            .join(`"`)
            .trim();
    }
}
