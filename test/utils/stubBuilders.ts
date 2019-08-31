import { SinonStub } from "sinon";
import {
    EmployeeRepository,
    MongoDbAdapter,
    PaymentMethodRepository,
    ServiceChargeRepository,
    TimeCardRepository,
    UnionMemberRepository,
    Actions,
    PaymentRepository
} from "../../src";
import { sandbox } from "@test/unit";

export function buildStubEmployeeRepository(): Stub<EmployeeRepository> {
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

export function buildStubPaymentMethodRepository(): Stub<PaymentMethodRepository> {
    return buildStubFor({
        fetchByEmployeeId: true,
        insert: true,
        deleteByEmployeeId: true
    });
}

export function buildStubTimeCardRepository(): Stub<TimeCardRepository> {
    return buildStubFor({
        insert: true,
        fetchAllOfEmployee: true,
        fetchAllOfEmployeeSince: true
    });
}

export function buildStubServiceChargeRepository(): Stub<ServiceChargeRepository> {
    return buildStubFor({
        insert: true,
        fetchAllOfMember: true,
        fetchAll: true
    });
}

export function buildStubUnionMemberRepository(): Stub<UnionMemberRepository> {
    return buildStubFor({
        fetchByMemberId: true,
        fetchByEmployeeId: true,
        exists: true,
        insert: true,
        deleteByEmployeeId: true
    });
}

export function buildStubPaymentRepository(): Stub<PaymentRepository> {
    return buildStubFor({
        fetchLastOfEmployee: true,
        fetchEmployeeLastPaymentDate: true,
        insert: true
    });
}

export function buildStubMongoDbAdapter<T>(): Stub<MongoDbAdapter<T>> {
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

export function buildStubActions(): Stub<Actions> {
    return buildStubFor({
        deleteEmployee: true,
        createTimeCard: true,
        createServiceCharge: true,
        createSalesReceipt: true,
        createEmployee: true,
        updateEmployee: true,
        setEmployeePaymentMethod: true,
        createUnionMember: true,
        removeEmployeeFromUnion: true,
        runPayroll: true
    });
}

export type Stub<T> = T extends Function ? StubFunction : StubObject<T>;
type StubFunction = SinonStub;
type StubObject<T> = {
    [K in keyof T]: SinonStub;
};

export function buildStubFor<T extends Record<string, boolean>>(object: T): StubObject<T>;
export function buildStubFor(name: string): StubFunction;
export function buildStubFor<T extends Record<string, boolean>>(object: T | string): StubObject<T> | StubFunction {
    if (typeof object === "string") {
        return buildStubForFunction(object);
    } else {
        return buildStubForObject(object);
    }
}

function buildStubForObject<T extends Record<string, boolean>>(object: T): StubObject<T> {
    const result: Record<string, SinonStub> = {};
    for (const key in object) {
        // noinspection JSUnfilteredForInLoop
        result[key] = buildStubForFunction(key);
    }
    return result as { [K in keyof T]: SinonStub };
}

function buildStubForFunction(name: string): StubFunction {
    return sandbox.stub().rejects(`${name} should not have been called`);
}
