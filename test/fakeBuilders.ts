import { SinonStub } from "sinon";
import {
    EmployeeRepository,
    ServiceChargeRepository,
    TimeCardRepository,
    Transactions
} from "../src";
import { sandbox } from "./unitTest";

export type Fake<T> = {
    [K in keyof T]: SinonStub;
};

export function buildFakeEmployeeRepository(): Fake<EmployeeRepository> {
    return {
        fetchById: buildStubFor("fetchById"),
        fetchByMemberId: buildStubFor("fetchByMemberId"),
        insertOne: buildStubFor("insertOne"),
        exists: buildStubFor("exists"),
        deleteById: buildStubFor("deleteById"),
        updateById: buildStubFor("updateById")
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

export function buildFakeTransactions(): Fake<Transactions> {
    return {
        addEmployee: buildStubFor("addEmployee"),
        deleteEmployee: buildStubFor("deleteEmployee"),
        postTimeCard: buildStubFor("postTimeCard"),
        postSalesReceipt: buildStubFor("postSalesReceipt"),
        postServiceCharge: buildStubFor("postServiceCharge"),
        changeEmployee: buildStubFor("changeEmployee")
    };
}

export function buildStubFor(name: string): SinonStub {
    return sandbox.stub().rejects(`${name} should not have been called`);
}
