import {
    DirectPaymentMethod,
    HoldPaymentMethod,
    MailPaymentMethod,
    PaymentMethod,
    PaymentMethodType
} from "@payroll/core";
import { When } from "cucumber";
import { executePayrollCommand, store } from "../../utils";
import { removeLastArg } from "./removeLastArg";

When(
    /^I execute the( incomplete)? ChgEmp command on (\w+) to change the (name|address|payment method) to (?:")?([^"]+)(?:")?$/,
    async (isIncomplete: string | undefined, name: string, field: string, value: string) => {
        let command = buildCommand();
        if (isIncomplete) {
            command = removeLastArg(command);
        }
        await executePayrollCommand(command);

        function buildCommand(): string {
            const employee = store.employees.get(name);
            return `ChgEmp ${employee.getId()} ` + buildSubCommand();
        }
        function buildSubCommand(): string {
            if (field === "name") return `Name "${value}"`;
            if (field === "address") return `Address "${value}"`;
            if (field === "payment method") {
                const paymentMethod = store.paymentMethods.get(value);
                if (isHold(paymentMethod)) return `Hold`;
                if (isDirect(paymentMethod)) return `Direct ${paymentMethod.getBank()} ${paymentMethod.getAccount()}`;
                if (isMail(paymentMethod)) return `Mail ${paymentMethod.getAddress()}`;
            }
            throw new Error(`invalid field - value:  "${field}" - "${value}"`);
        }
        function isHold(paymentMethod: PaymentMethod): paymentMethod is HoldPaymentMethod {
            return paymentMethod.hasType(PaymentMethodType.HOLD);
        }
        function isDirect(paymentMethod: PaymentMethod): paymentMethod is DirectPaymentMethod {
            return paymentMethod.hasType(PaymentMethodType.DIRECT);
        }
        function isMail(paymentMethod: PaymentMethod): paymentMethod is MailPaymentMethod {
            return paymentMethod.hasType(PaymentMethodType.MAIL);
        }
    }
);
When(
    /^I execute the ChgEmp command on (\w+) to change the type to hourly with a hourly rate of (\d+\.?\d*)/,
    async (name: string, hourlyRate: number) => {
        const employee = store.employees.get(name);
        return executePayrollCommand(`ChgEmp ${employee.getId()} Hourly ${hourlyRate}`);
    }
);
When(
    /^I execute the ChgEmp command on (\w+) to change the type to salaried with a salary of (\d+\.?\d*)$/,
    async (name: string, salary: number) => {
        const employee = store.employees.get(name);
        return executePayrollCommand(`ChgEmp ${employee.getId()} Salaried ${salary}`);
    }
);
When(
    /^I execute the ChgEmp command on (\w+) to change the type to commissioned with a salary of (\d+\.?\d*) and a commission rate of (\d+\.?\d*)$/,
    async (name: string, salary: number, commissionRate: number) => {
        const employee = store.employees.get(name);
        return executePayrollCommand(`ChgEmp ${employee.getId()} Commissioned ${salary} ${commissionRate}`);
    }
);
When(
    /^I execute the ChgEmp command on (\w+) to add the membership (\w+)$/,
    async (name: string, membershipName: string) => {
        const employee = store.employees.get(name);
        const unionMembership = store.unionMembers.get(membershipName);
        return executePayrollCommand(
            `ChgEmp ${employee.getId()} Member ${unionMembership.getMemberId()} Dues ${unionMembership.getRate()}`
        );
    }
);
When(
    /^I execute an incomplete ChgEmp command on (\w+) to add the membership (\w+)$/,
    async (name: string, membershipName: string) => {
        const employee = store.employees.get(name);
        const unionMembership = store.unionMembers.get(membershipName);
        return executePayrollCommand(`ChgEmp ${employee.getId()} Member ${unionMembership.getMemberId()} Dues`);
    }
);
When(/^I execute the ChgEmp command on (\w+) to remove from the union$/, async (name: string) => {
    const employee = store.employees.get(name);
    return executePayrollCommand(`ChgEmp ${employee.getId()} NoMember`);
});
