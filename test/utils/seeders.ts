import {
    CommissionedEmployee,
    dbEmployees,
    dbPaymentMethods,
    dbPayments,
    dbSalesReceipts,
    dbTimeCards,
    dbUnionMembers,
    DirectPaymentMethod,
    HoldPaymentMethod,
    HourlyEmployee,
    Payment,
    SalariedEmployee,
    SalesReceipt,
    TimeCard,
    UnionMember,
    UnionMemberDBModel
} from "../../src";
import {
    generateCommissionedEmployee,
    generateDirectPaymentMethod,
    generateHoldPaymentMethod,
    generateHourlyEmployee,
    generatePayment,
    generateSalariedEmployee,
    generateSalesReceipt,
    generateTimeCard,
    generateUnionMember
} from "./generators";

export async function seedHourlyEmployee(args: Partial<HourlyEmployee> = {}): Promise<HourlyEmployee> {
    const employee = generateHourlyEmployee(args);
    await dbEmployees.insert(employee);
    return employee;
}

export async function seedSalariedEmployee(args: Partial<SalariedEmployee> = {}): Promise<SalariedEmployee> {
    const employee = generateSalariedEmployee(args);
    await dbEmployees.insert(employee);
    return employee;
}

export async function seedCommissionedEmployee(
    args: Partial<CommissionedEmployee> = {}
): Promise<CommissionedEmployee> {
    const employee = generateCommissionedEmployee(args);
    await dbEmployees.insert(employee);
    return employee;
}

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

export async function seedUnionMember(args: Partial<UnionMemberDBModel> = {}): Promise<UnionMember> {
    const unionMember = generateUnionMember(args);
    await dbUnionMembers.insert({
        rate: unionMember.getRate(),
        memberId: unionMember.getMemberId(),
        employeeId: unionMember.getEmployeeId()
    });
    return unionMember;
}

export async function seedTimeCard(args: Partial<TimeCard> = {}): Promise<TimeCard> {
    const timeCard = generateTimeCard(args);
    await dbTimeCards.insert(timeCard);
    return timeCard;
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
