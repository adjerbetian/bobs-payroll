import { SinonStub } from "sinon";
import {
    EmployeeRepository,
    MongoDbAdapter,
    PaymentMethodRepository,
    ServiceChargeRepository,
    TimeCardRepository,
    UnionMemberRepository,
    CoreActions,
    PaymentRepository,
    SalesReceiptRepository,
    PaymentActions
} from "../../src";
import { sandbox } from "@test/unit";

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

export function buildStubbedUnionMemberRepository(): Stub<UnionMemberRepository> {
    return buildStubFor({
        fetchByMemberId: true,
        fetchByEmployeeId: true,
        exists: true,
        insert: true,
        deleteByEmployeeId: true
    });
}

export function buildStubbedPaymentRepository(): Stub<PaymentRepository> {
    return buildStubFor({
        fetchLastOfEmployee: true,
        fetchEmployeeLastPaymentDate: true,
        insert: true
    });
}

export function buildStubbedMongoDbAdapter<T>(): Stub<MongoDbAdapter<T>> {
    return buildStubFor({
        fetch: true,
        fetchLast: true,
        insert: true,
        exists: true,
        remove: true,
        update: true,
        fetchAll: true,
        removeAll: true
    });
}

export function buildStubbedCoreActions(): Stub<CoreActions> {
    return buildStubFor({
        deleteEmployee: true,
        createTimeCard: true,
        createServiceCharge: true,
        createSalesReceipt: true,
        createEmployee: true,
        updateEmployee: true,
        setEmployeePaymentMethod: true,
        createUnionMember: true,
        removeEmployeeFromUnion: true
    });
}

export function buildStubbedPaymentActions(): Stub<PaymentActions> {
    return buildStubFor({
        runPayroll: true
    });
}

export type Stub<T> = T extends Function ? StubbedFunction : StubbedObject<T>;
type StubbedFunction = SinonStub;
type StubbedObject<T> = {
    [K in keyof T]: SinonStub;
};

export function buildStubFor<T extends Record<string, boolean>>(object: T): StubbedObject<T>;
export function buildStubFor(name: string): StubbedFunction;
export function buildStubFor<T extends Record<string, boolean>>(
    object: T | string
): StubbedObject<T> | StubbedFunction {
    if (typeof object === "string") {
        return buildStubForFunction(object);
    } else {
        return buildStubForObject(object);
    }
}

function buildStubForObject<T extends Record<string, boolean>>(object: T): StubbedObject<T> {
    const result: Record<string, SinonStub> = {};
    for (const key in object) {
        // noinspection JSUnfilteredForInLoop
        result[key] = buildStubForFunction(key);
    }
    return result as { [K in keyof T]: SinonStub };
}

function buildStubForFunction(name: string): StubbedFunction {
    return sandbox.stub().rejects(`${name} should not have been called`);
}
