import { Before } from "cucumber";
import { Employee, SalesReceipt, ServiceCharge, TimeCard, UnionMember } from "../../app";
import { buildNonNullMap, NonNullMap } from "./NonNullMap";

export const store = buildVariablesStore();
Before(() => store.reset());

interface Store {
    readonly employees: NonNullMap<Employee>;
    readonly timeCards: NonNullMap<TimeCard>;
    readonly salesReceipts: NonNullMap<SalesReceipt>;
    readonly unionMembers: NonNullMap<UnionMember>;
    readonly serviceCharges: NonNullMap<ServiceCharge>;
    reset(): void;
}

function buildVariablesStore(): Store {
    const employeeMap = buildNonNullMap<Employee>();
    const timeCardMap = buildNonNullMap<TimeCard>();
    const salesReceiptMap = buildNonNullMap<SalesReceipt>();
    const unionMemberMap = buildNonNullMap<UnionMember>();
    const serviceChargeMap = buildNonNullMap<ServiceCharge>();

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
            return unionMemberMap;
        },
        get serviceCharges() {
            return serviceChargeMap;
        },
        reset() {
            employeeMap.reset();
            timeCardMap.reset();
            salesReceiptMap.reset();
            unionMemberMap.reset();
            serviceChargeMap.reset();
        }
    };
}
