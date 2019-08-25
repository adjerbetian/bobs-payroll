import { SinonStub } from "sinon";
import {
    EmployeeRepository,
    PaymentMethodRepository,
    ServiceChargeRepository,
    TimeCardRepository,
    UnionMemberRepository
} from "../src";
import { sandbox } from "./unitTest";

export type Fake<T> = {
    [K in keyof T]: SinonStub;
};

export function buildFakeEmployeeRepository(): Fake<EmployeeRepository> {
    return {
        fetchById: buildStubFor("fetchById"),
        insertOne: buildStubFor("insertOne"),
        exists: buildStubFor("exists"),
        deleteById: buildStubFor("deleteById"),
        updateById: buildStubFor("updateById")
    };
}

export function buildFakePaymentMethodRepository(): Fake<PaymentMethodRepository> {
    return {
        fetchByEmployeeId: buildStubFor("fetchByEmployeeId"),
        insertOne: buildStubFor("insertOne"),
        deleteByEmployeeId: buildStubFor("deleteByEmployeeId")
    };
}

export function buildFakeTimeCardRepository(): Fake<TimeCardRepository> {
    return {
        insertOne: buildStubFor("insertOne"),
        fetchAllOfEmployee: buildStubFor("fetchAllOfEmployee")
    };
}

export function buildFakeServiceChargeRepository(): Fake<ServiceChargeRepository> {
    return {
        insertOne: buildStubFor("insertOne"),
        fetchAllOfMember: buildStubFor("fetchAllOfMember"),
        fetchAll: buildStubFor("fetchAll")
    };
}

export function buildFakeUnionMemberRepository(): Fake<UnionMemberRepository> {
    return {
        fetchByMemberId: buildStubFor("fetchByMemberId"),
        fetchByEmployeeId: buildStubFor("fetchByEmployeeId"),
        insertOne: buildStubFor("insertOne")
    };
}

export function buildStubFor(name: string): SinonStub {
    return sandbox.stub().rejects(`${name} should not have been called`);
}
