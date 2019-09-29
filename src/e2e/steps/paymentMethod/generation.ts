import { generators, seeders } from "@test/generators";
import { Given } from "cucumber";
import { PaymentMethod } from "../../../app";
import { store } from "../../utils";

Given(
    "a {string} payment method {string} for {string}",
    async (type: string, paymentMethodName: string, employeeName: string) => {
        const employee = store.employees.get(employeeName);
        const paymentMethod = await seedPaymentMethod();
        store.paymentMethods.set(paymentMethodName, paymentMethod);

        async function seedPaymentMethod(): Promise<PaymentMethod> {
            if (type === "Hold") return seeders.seedHoldPaymentMethod({ employeeId: employee.getId() });
            if (type === "Direct") return seeders.seedDirectPaymentMethod({ employeeId: employee.getId() });
            if (type === "Mail") return seeders.seedMailPaymentMethod({ employeeId: employee.getId() });
            throw new Error("invalid type");
        }
    }
);
Given(
    "a new {string} payment method {string} for {string}",
    async (type: string, paymentMethodName: string, employeeName: string) => {
        const employee = store.employees.get(employeeName);
        const paymentMethod = buildPaymentMethod();
        store.paymentMethods.set(paymentMethodName, paymentMethod);

        function buildPaymentMethod(): PaymentMethod {
            if (type === "Hold") return generators.generateHoldPaymentMethod({ employeeId: employee.getId() });
            if (type === "Direct") return generators.generateDirectPaymentMethod({ employeeId: employee.getId() });
            if (type === "Mail") return generators.generateMailPaymentMethod({ employeeId: employee.getId() });
            throw new Error("invalid type");
        }
    }
);
