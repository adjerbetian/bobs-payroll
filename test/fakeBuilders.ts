import { sandbox } from "./unitTest";
import { SinonStub } from "sinon";
import { EmployeeRepository, TimeCardRepository } from "../src/repositories";
import { Transactions } from "../src/transactions/Transactions";

export interface FakeEmployeeRepository extends EmployeeRepository {
    fetchEmployeeById: SinonStub;
    insertOne: SinonStub;
    exists: SinonStub;
    deleteById: SinonStub;
}

export function buildFakeEmployeeRepository(): FakeEmployeeRepository {
    return {
        fetchEmployeeById: buildStubFor("fetchEmployeeById"),
        insertOne: buildStubFor("insertOne"),
        exists: buildStubFor("exists"),
        deleteById: buildStubFor("deleteById")
    };
}

export interface FakeTimeCardRepository extends TimeCardRepository {
    insertOne: SinonStub;
    fetchAllOfEmployee: SinonStub;
}

export function buildFakeTimeCardRepository(): FakeTimeCardRepository {
    return {
        insertOne: buildStubFor("insertOne"),
        fetchAllOfEmployee: buildStubFor("fetchAllOfEmployee")
    };
}

export interface FakeTransactions extends Transactions {
    addEmployee: SinonStub;
    deleteEmployee: SinonStub;
    postTimeCard: SinonStub;
    postSalesReceipt: SinonStub;
    postServiceCharge: SinonStub;
}

export function buildFakeTransactions(): FakeTransactions {
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
