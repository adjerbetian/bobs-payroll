import {
    CommissionedEmployee,
    DirectPaymentMethod,
    HoldPaymentMethod,
    HourlyEmployee,
    mongoEmployeeRepository,
    mongoPaymentMethodRepository,
    mongoPaymentRepository,
    mongoTimeCardRepository,
    mongoUnionMemberRepository,
    Payment,
    SalariedEmployee,
    TimeCard,
    UnionMember
} from "../../src";
import {
    generateCommissionedEmployee,
    generateDirectPaymentMethod,
    generateHoldPaymentMethod,
    generateHourlyEmployee,
    generatePayment,
    generateSalariedEmployee,
    generateTimeCard,
    generateUnionMember
} from "./generators";

export async function seedHourlyEmployee(args: Partial<HourlyEmployee> = {}): Promise<HourlyEmployee> {
    const employee = generateHourlyEmployee(args);
    await mongoEmployeeRepository.insert(employee);
    return employee;
}

export async function seedSalariedEmployee(args: Partial<SalariedEmployee> = {}): Promise<SalariedEmployee> {
    const employee = generateSalariedEmployee(args);
    await mongoEmployeeRepository.insert(employee);
    return employee;
}

export async function seedCommissionedEmployee(
    args: Partial<CommissionedEmployee> = {}
): Promise<CommissionedEmployee> {
    const employee = generateCommissionedEmployee(args);
    await mongoEmployeeRepository.insert(employee);
    return employee;
}

export async function seedHoldPaymentMethod(args: Partial<HoldPaymentMethod> = {}): Promise<HoldPaymentMethod> {
    const paymentMethod = generateHoldPaymentMethod(args);
    await mongoPaymentMethodRepository.insert(paymentMethod);
    return paymentMethod;
}

export async function seedDirectPaymentMethod(args: Partial<DirectPaymentMethod> = {}): Promise<DirectPaymentMethod> {
    const paymentMethod = generateDirectPaymentMethod(args);
    await mongoPaymentMethodRepository.insert(paymentMethod);
    return paymentMethod;
}

export async function seedUnionMember(args: Partial<UnionMember> = {}): Promise<UnionMember> {
    const unionMember = generateUnionMember(args);
    await mongoUnionMemberRepository.insert(unionMember);
    return unionMember;
}

export async function seedTimeCard(args: Partial<TimeCard> = {}): Promise<TimeCard> {
    const timeCard = generateTimeCard(args);
    await mongoTimeCardRepository.insert(timeCard);
    return timeCard;
}

export async function seedPayment(args: Partial<Payment> = {}): Promise<Payment> {
    const payment = generatePayment(args);
    await mongoPaymentRepository.insert(payment);
    return payment;
}
