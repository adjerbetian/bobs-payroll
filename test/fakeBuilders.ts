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
        fetchEmployeeById: buildStubFor("fetchEmployeeById"),
        fetchEmployeeByMemberId: buildStubFor("fetchEmployeeByMemberId"),
        insertOne: buildStubFor("insertOne"),
        exists: buildStubFor("exists"),
        deleteById: buildStubFor("deleteById")
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
        postServiceCharge: buildStubFor("postServiceCharge")
    };
}

export function buildStubFor(name: string): SinonStub {
    return sandbox.stub().rejects(`${name} should not have been called`);
}
