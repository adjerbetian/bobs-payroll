import {
    dbPaymentMethods,
    dbPayments,
    dbSalesReceipts,
    DirectPaymentMethod,
    HoldPaymentMethod,
    Payment,
    SalesReceipt
} from "../../src";
import {
    generateDirectPaymentMethod,
    generateHoldPaymentMethod,
    generatePayment,
    generateSalesReceipt
} from "./generators";

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

export async function seedSalesReceipt(args: Partial<SalesReceipt> = {}): Promise<SalesReceipt> {
    const salesReceipt = generateSalesReceipt(args);
    await dbSalesReceipts.insert(salesReceipt);
    return salesReceipt;
}

export async function seedPayment(args: Partial<Payment> = {}): Promise<Payment> {
    const payment = generatePayment(args);
    await dbPayments.insert(payment);
    return payment;
}
