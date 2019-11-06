import { Employee, PaymentMethod, SalesReceipt, ServiceCharge, TimeCard, UnionMembership } from "@modules/core";
import { buildNonNullMap, NonNullMap } from "./NonNullMap";

export const store = buildVariablesStore();

interface Store {
    readonly employees: NonNullMap<Employee>;
    readonly timeCards: NonNullMap<TimeCard>;
    readonly salesReceipts: NonNullMap<SalesReceipt>;
    readonly unionMembers: NonNullMap<UnionMembership>;
    readonly serviceCharges: NonNullMap<ServiceCharge>;
    readonly paymentMethods: NonNullMap<PaymentMethod>;
    reset(): void;
}

function buildVariablesStore(): Store {
    const maps: NonNullMap<any>[] = [];

    const employeeMap = buildMap<Employee>();
    const timeCardMap = buildMap<TimeCard>();
    const salesReceiptMap = buildMap<SalesReceipt>();
    const unionMembershipMap = buildMap<UnionMembership>();
    const serviceChargeMap = buildMap<ServiceCharge>();
    const paymentMethodMap = buildMap<PaymentMethod>();

    return {
        get employees() {
            return employeeMap;
        },
        get timeCards() {
            return timeCardMap;
        },
        get salesReceipts() {
            return salesReceiptMap;
        },
        get unionMembers() {
            return unionMembershipMap;
        },
        get serviceCharges() {
            return serviceChargeMap;
        },
        get paymentMethods() {
            return paymentMethodMap;
        },
        reset() {
            maps.forEach(map => map.reset());
        }
    };

    function buildMap<T>(): NonNullMap<T> {
        const map = buildNonNullMap<T>();
        maps.push(map);
        return map;
    }
}
