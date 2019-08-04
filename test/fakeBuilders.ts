import { sandbox } from "./unitTest";
import { SinonStub } from "sinon";
import { EmployeeRepository } from "../src/repositories";
import { Transactions } from "../src/transactions";

export interface FakeEmployeeRepository extends EmployeeRepository {
    fetchEmployeeById: SinonStub;
    insertOne: SinonStub;
    exists: SinonStub;
}

export function buildFakeEmployeeRepository(): FakeEmployeeRepository {
    return {
        fetchEmployeeById: buildStubFor("fetchEmployeeById"),
        insertOne: buildStubFor("insertOne"),
        exists: buildStubFor("exists")
    };
}

export interface FakeTransactions extends Transactions {
    addEmployee: SinonStub;
}

export function buildFakeTransactions(): FakeTransactions {
    return {
        addEmployee: buildStubFor("addEmployee")
    };
}

export function buildStubFor(name: string): SinonStub {
    return sandbox.stub().rejects(`${name} should not have been called`);
}
