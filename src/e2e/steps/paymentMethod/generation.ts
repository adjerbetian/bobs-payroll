import { generators, seeders } from "@test/generators";
import { Given } from "cucumber";
import { PaymentMethod } from "../../../app";
import { store } from "../../utils";

Given(
    /^a( new)? (hold|direct|mail) payment method (\w+) for (\w+)$/,
    async (isNew: string | undefined, type: string, paymentMethodName: string, employeeName: string) => {
        const paymentMethod = await seedOrGenerate();
        store.paymentMethods.set(paymentMethodName, paymentMethod);

        async function seedOrGenerate(): Promise<PaymentMethod> {
            const employee = store.employees.get(employeeName);
            const partialPaymentMethod = { employeeId: employee.getId() };

            if (isNew) return generatePaymentMethod(partialPaymentMethod);
            else return seedPaymentMethod(partialPaymentMethod);
        }

        async function seedPaymentMethod(args: { employeeId: number }): Promise<PaymentMethod> {
            if (type === "hold") return seeders.seedHoldPaymentMethod(args);
            if (type === "direct") return seeders.seedDirectPaymentMethod(args);
            if (type === "mail") return seeders.seedMailPaymentMethod(args);
            throw new Error("invalid type");
        }
        function generatePaymentMethod(args: { employeeId: number }): PaymentMethod {
            if (type === "hold") return generators.generateHoldPaymentMethod(args);
            if (type === "direct") return generators.generateDirectPaymentMethod(args);
            if (type === "mail") return generators.generateMailPaymentMethod(args);
            throw new Error("invalid type");
        }
    }
);
