import {
    CommissionedEmployee,
    DirectPaymentMethod,
    HoldPaymentMethod,
    HourlyEmployee,
    mongoEmployeeRepository,
    mongoPaymentMethodRepository,
    mongoServiceChargeRepository,
    mongoTimeCardRepository,
    mongoUnionMemberRepository,
    SalariedEmployee,
    ServiceCharge,
    TimeCard,
    UnionMember
} from "../src";
import {
    generateCommissionedEmployee,
    generateDirectPaymentMethod,
    generateHoldPaymentMethod,
    generateHourlyEmployee,
    generateSalariedEmployee,
    generateServiceCharge,
    generateTimeCard,
    generateUnionMember
} from "./generators";

export async function seedHourlyEmployee(args: Partial<HourlyEmployee> = {}): Promise<HourlyEmployee> {
    const employee = generateHourlyEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}

export async function seedSalariedEmployee(args: Partial<SalariedEmployee> = {}): Promise<SalariedEmployee> {
    const employee = generateSalariedEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}

export async function seedCommissionedEmployee(
    args: Partial<CommissionedEmployee> = {}
): Promise<CommissionedEmployee> {
    const employee = generateCommissionedEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}

export async function seedServiceCharge(args: Partial<ServiceCharge> = {}): Promise<ServiceCharge> {
    const serviceCharge = generateServiceCharge(args);
    await mongoServiceChargeRepository.insertOne(serviceCharge);
    return serviceCharge;
}

export async function seedTimeCard(args: Partial<TimeCard> = {}): Promise<TimeCard> {
    const timeCard = generateTimeCard(args);
    await mongoTimeCardRepository.insertOne(timeCard);
    return timeCard;
}

export async function seedHoldPaymentMethod(args: Partial<HoldPaymentMethod> = {}): Promise<HoldPaymentMethod> {
    const paymentMethod = generateHoldPaymentMethod(args);
    await mongoPaymentMethodRepository.insertOne(paymentMethod);
    return paymentMethod;
}

export async function seedDirectPaymentMethod(args: Partial<DirectPaymentMethod> = {}): Promise<DirectPaymentMethod> {
    const paymentMethod = generateDirectPaymentMethod(args);
    await mongoPaymentMethodRepository.insertOne(paymentMethod);
    return paymentMethod;
}

export async function seedUnionMember(args: Partial<UnionMember> = {}): Promise<UnionMember> {
    const unionMember = generateUnionMember(args);
    await mongoUnionMemberRepository.insertOne(unionMember);
    return unionMember;
}
