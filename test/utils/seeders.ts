import { dbPaymentMethods, dbPayments, DirectPaymentMethod, HoldPaymentMethod, Payment } from "../../src";
import { generateDirectPaymentMethod, generateHoldPaymentMethod, generatePayment } from "./generators";

export async function seedHoldPaymentMethod(args: Partial<HoldPaymentMethod> = {}): Promise<HoldPaymentMethod> {
    const paymentMethod = generateHoldPaymentMethod(args);
    await dbPaymentMethods.insert(paymentMethod);
    return paymentMethod;
}

export async function seedDirectPaymentMethod(args: Partial<DirectPaymentMethod> = {}): Promise<DirectPaymentMethod> {
    const paymentMethod = generateDirectPaymentMethod(args);
    await dbPaymentMethods.insert(paymentMethod);
    return paymentMethod;
}

export async function seedPayment(args: Partial<Payment> = {}): Promise<Payment> {
    const payment = generatePayment(args);
    await dbPayments.insert(payment);
    return payment;
}
