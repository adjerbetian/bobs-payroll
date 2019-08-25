import {
    CommissionedEmployee,
    DirectPaymentMethod,
    HourlyEmployee,
    mongoEmployeeRepository,
    mongoPaymentMethodRepository,
    mongoServiceChargeRepository,
    mongoTimeCardRepository,
    SalariedEmployee,
    ServiceCharge,
    TimeCard
} from "../src";
import {
    generateCommissionedEmployee,
    generateDirectPaymentMethod,
    generateHourlyEmployee,
    generateSalariedEmployee,
    generateServiceCharge,
    generateTimeCard,
    generateUnionEmployee
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

export async function seedUnionEmployee(args: Partial<HourlyEmployee> = {}): Promise<HourlyEmployee> {
    const employee = generateUnionEmployee(args);
    await mongoEmployeeRepository.insertOne(employee);
    return employee;
}

export async function seedDirectPaymentMethod(args: Partial<DirectPaymentMethod> = {}): Promise<DirectPaymentMethod> {
    const paymentMethod = generateDirectPaymentMethod(args);
    await mongoPaymentMethodRepository.insertOne(paymentMethod);
    return paymentMethod;
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
