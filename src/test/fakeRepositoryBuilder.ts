import { sandbox } from "./unitTest";
import { SinonStub } from "sinon";
import { EmployeeRepository } from "../repositories";

interface FakeEmployeeRepository extends EmployeeRepository {
    fetchEmployeeById: SinonStub;
    insertOne: SinonStub;
}

export function buildFakeEmployeeRepository(): FakeEmployeeRepository {
    return {
        fetchEmployeeById: buildStubFor("fetchEmployeeById"),
        insertOne: buildStubFor("insertOne")
    };
}

function buildStubFor(name: string): SinonStub {
    return sandbox.stub().rejects(`${name} should not have been called`);
}
