import { buildStubFor, Stub } from "@payroll/test";
import {
    EmployeeRepository,
    PaymentMethodRepository,
    SalesReceiptRepository,
    ServiceChargeRepository,
    TimeCardRepository,
    UnionMembershipRepository
} from "../repositories";

export function buildStubbedEmployeeRepository(): Stub<EmployeeRepository> {
    return buildStubFor({
        fetchById: true,
        insert: true,
        exists: true,
        deleteById: true,
        updateById: true,
        fetchAllHourly: true,
        fetchAllSalaried: true,
        fetchAllCommissioned: true
    });
}

export function buildStubbedPaymentMethodRepository(): Stub<PaymentMethodRepository> {
    return buildStubFor({
        fetchByEmployeeId: true,
        insert: true,
        deleteByEmployeeId: true
    });
}

export function buildStubbedTimeCardRepository(): Stub<TimeCardRepository> {
    return buildStubFor({
        insert: true,
        fetchAllOfEmployee: true,
        fetchAllOfEmployeeSince: true
    });
}

export function buildStubbedSalesReceiptRepository(): Stub<SalesReceiptRepository> {
    return buildStubFor({
        insert: true,
        fetchAllOfEmployee: true,
        fetchAllOfEmployeeSince: true
    });
}

export function buildStubbedServiceChargeRepository(): Stub<ServiceChargeRepository> {
    return buildStubFor({
        insert: true,
        fetchAllOfMember: true,
        fetchAll: true
    });
}

export function buildStubbedUnionMembershipRepository(): Stub<UnionMembershipRepository> {
    return buildStubFor({
        fetchByMemberId: true,
        fetchByEmployeeId: true,
        doesMemberIdExist: true,
        insert: true,
        deleteByEmployeeId: true
    });
}
