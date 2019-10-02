import { executePayrollCommand } from "@test/cucumber";
import { When } from "cucumber";
import {
    DirectPaymentMethod,
    HoldPaymentMethod,
    MailPaymentMethod,
    PaymentMethod,
    PaymentMethodType
} from "../../../app";
import { store } from "../../utils";

When(
    "I execute the ChgEmp command on {} to change the {string} to {string}",
    async (name: string, field: string, value: string) => {
        const employee = store.employees.get(name);
        if (field === "name") {
            return executePayrollCommand(`ChgEmp ${employee.getId()} Name "${value}"`);
        }
        if (field === "address") {
            return executePayrollCommand(`ChgEmp ${employee.getId()} Address "${value}"`);
        }
    }
);
When(
    "I execute the ChgEmp command on {} to change the type to hourly with a hourly rate of {float}",
    async (name: string, hourlyRate: number) => {
        const employee = store.employees.get(name);
        return executePayrollCommand(`ChgEmp ${employee.getId()} Hourly ${hourlyRate}`);
    }
);
When(
    "I execute the ChgEmp command on {} to change the type to salaried with a salary of {float}",
    async (name: string, salary: number) => {
        const employee = store.employees.get(name);
        return executePayrollCommand(`ChgEmp ${employee.getId()} Salaried ${salary}`);
    }
);
When(
    "I execute the ChgEmp command on {} to change the type to commissioned with a salary of {float} and a commission rate of {float}",
    async (name: string, salary: number, commissionRate: number) => {
        const employee = store.employees.get(name);
        return executePayrollCommand(`ChgEmp ${employee.getId()} Commissioned ${salary} ${commissionRate}`);
    }
);
When(
    "I execute the ChgEmp command on {} to change the payment method to {string}",
    async (name: string, paymentMethodName: string) => {
        const employee = store.employees.get(name);
        return executePayrollCommand(buildCommand());

        // prettier-ignore
        function buildCommand(): string {
            const paymentMethod = store.paymentMethods.get(paymentMethodName);
            if (isHold(paymentMethod)) return `ChgEmp ${employee.getId()} Hold`;
            if (isDirect(paymentMethod)) return `ChgEmp ${employee.getId()} Direct ${paymentMethod.getBank()} ${paymentMethod.getAccount()}`;
            if (isMail(paymentMethod)) return `ChgEmp ${employee.getId()} Mail ${paymentMethod.getAddress()}`;
            throw new Error("invalid type");
        }
    }
);
When(
    "I execute an incomplete ChgEmp command on {} to change the payment method to {string}",
    async (name: string, paymentMethodName: string) => {
        const employee = store.employees.get(name);
        return executePayrollCommand(buildCommand());

        function buildCommand(): string {
            const paymentMethod = store.paymentMethods.get(paymentMethodName);
            if (isMail(paymentMethod)) return `ChgEmp ${employee.getId()} Mail`;
            if (isDirect(paymentMethod)) return `ChgEmp ${employee.getId()} Direct ${paymentMethod.getBank()}`;
            throw new Error("invalid type");
        }
    }
);
function isHold(paymentMethod: PaymentMethod): paymentMethod is HoldPaymentMethod {
    return paymentMethod.hasType(PaymentMethodType.HOLD);
}
function isDirect(paymentMethod: PaymentMethod): paymentMethod is DirectPaymentMethod {
    return paymentMethod.hasType(PaymentMethodType.DIRECT);
}
function isMail(paymentMethod: PaymentMethod): paymentMethod is MailPaymentMethod {
    return paymentMethod.hasType(PaymentMethodType.MAIL);
}

When(
    "I execute the ChgEmp command on {} to add the membership {string}",
    async (name: string, membershipName: string) => {
        const employee = store.employees.get(name);
        const unionMember = store.unionMembers.get(membershipName);
        return executePayrollCommand(
            `ChgEmp ${employee.getId()} Member ${unionMember.getMemberId()} Dues ${unionMember.getRate()}`
        );
    }
);
When(
    "I execute an incomplete ChgEmp command on {} to add the membership {string}",
    async (name: string, membershipName: string) => {
        const employee = store.employees.get(name);
        const unionMember = store.unionMembers.get(membershipName);
        return executePayrollCommand(`ChgEmp ${employee.getId()} Member ${unionMember.getMemberId()} Dues`);
    }
);
When("I execute the ChgEmp command on {} to remove from the union", async (name: string) => {
    const employee = store.employees.get(name);
    return executePayrollCommand(`ChgEmp ${employee.getId()} NoMember`);
});
