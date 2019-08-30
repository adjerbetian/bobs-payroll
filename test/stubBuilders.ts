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
} from "../src";
import { sandbox } from "./unitTest";

export type Stub<T> = T extends Function ? StubFunction : StubObject<T>;
type StubFunction = SinonStub;
type StubObject<T> = {
    [K in keyof T]: SinonStub;
};

export function buildStubEmployeeRepository(): Stub<EmployeeRepository> {
    return {
        fetchById: buildStubFor("fetchById"),
        insert: buildStubFor("insert"),
        exists: buildStubFor("exists"),
        deleteById: buildStubFor("deleteById"),
        updateById: buildStubFor("updateById"),
        fetchAllHourly: buildStubFor("fetchAllHourly")
    };
}

export function buildStubPaymentMethodRepository(): Stub<PaymentMethodRepository> {
    return {
        fetchByEmployeeId: buildStubFor("fetchByEmployeeId"),
        insert: buildStubFor("insert"),
        deleteByEmployeeId: buildStubFor("deleteByEmployeeId")
    };
}

export function buildStubTimeCardRepository(): Stub<TimeCardRepository> {
    return {
        insert: buildStubFor("insert"),
        fetchAllOfEmployee: buildStubFor("fetchAllOfEmployee"),
        fetchAllOfEmployeeSince: buildStubFor("fetchAllOfEmployeeSince")
    };
}

export function buildStubServiceChargeRepository(): Stub<ServiceChargeRepository> {
    return {
        insert: buildStubFor("insert"),
        fetchAllOfMember: buildStubFor("fetchAllOfMember"),
        fetchAll: buildStubFor("fetchAll")
    };
}

export function buildStubUnionMemberRepository(): Stub<UnionMemberRepository> {
    return {
        fetchByMemberId: buildStubFor("fetchByMemberId"),
        fetchByEmployeeId: buildStubFor("fetchByEmployeeId"),
        exists: buildStubFor("exists"),
        insert: buildStubFor("insert"),
        deleteByEmployeeId: buildStubFor("deleteByEmployeeId")
    };
}

export function buildStubPaymentRepository(): Stub<PaymentRepository> {
    return {
        fetchLastOfEmployee: buildStubFor("fetchLastOfEmployee"),
        fetchEmployeeLastPaymentDate: buildStubFor("fetchEmployeeLastPaymentDate"),
        insert: buildStubFor("insert")
    };
}

export function buildStubMongoDbAdapter<T>(): Stub<MongoDbAdapter<T>> {
    return {
        fetch: buildStubFor("fetch"),
        fetchLast: buildStubFor("fetchLast"),
        insert: buildStubFor("insert"),
        exists: buildStubFor("exists"),
        remove: buildStubFor("remove"),
        update: buildStubFor("update"),
        fetchAll: buildStubFor("fetchAll"),
        removeAll: buildStubFor("removeAll")
    };
}

export function buildStubActions(): Stub<Actions> {
    return {
        deleteEmployee: buildStubFor("deleteEmployee"),
        createTimeCard: buildStubFor("createTimeCard"),
        createServiceCharge: buildStubFor("createServiceCharge"),
        createSalesReceipt: buildStubFor("createSalesReceipt"),
        createEmployee: buildStubFor("createEmployee"),
        updateEmployee: buildStubFor("updateEmployee"),
        setEmployeePaymentMethod: buildStubFor("setEmployeePaymentMethod"),
        createUnionMember: buildStubFor("createUnionMember"),
        removeEmployeeFromUnion: buildStubFor("removeEmployeeFromUnion"),
        runPayroll: buildStubFor("runPayroll")
    };
}

export function buildStubFor(name: string): SinonStub {
    return sandbox.stub().rejects(`${name} should not have been called`);
}
