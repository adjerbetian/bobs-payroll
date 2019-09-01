import { sandbox } from "@test/unit";
import { SinonStub } from "sinon";
import { CoreActions, PaymentActions } from "../../src";

export function buildStubbedCoreActions(): Stub<CoreActions> {
    return buildStubFor<CoreActions>({
        createEmployee: true,
        deleteEmployee: true,
        updateEmployee: true,
        fetchAllHourly: true,
        fetchAllSalaried: true,
        fetchAllCommissioned: true,

        createTimeCard: true,
        fetchEmployeeTimeCardsSince: true,

        createServiceCharge: true,

        createSalesReceipt: true,

        createPaymentMethod: true,
        fetchEmployeePaymentMethod: true,

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

type BooleansOf<T> = { [K in keyof T]: true };
export function buildStubFor<T>(object: BooleansOf<T>): StubbedObject<T>;
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
