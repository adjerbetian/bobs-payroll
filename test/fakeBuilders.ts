import { sandbox } from "./unitTest";
import { SinonStub } from "sinon";
import { EmployeeRepository, TimeCardRepository } from "../src/repositories";
import { Transactions } from "../src/transactions";

export type Fake<T> = {
    [K in keyof T]: SinonStub;
};

export function buildFakeEmployeeRepository(): Fake<EmployeeRepository> {
    return {
        fetchEmployeeById: buildStubFor("fetchEmployeeById"),
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
