import { Entity } from "./Entity";

export interface UnionMember extends Entity {
    getEmployeeId(): number;
    getMemberId(): string;
    getRate(): number;
}

export function buildUnionMember({
    rate,
    memberId,
    employeeId
}: {
    employeeId: number;
    memberId: string;
    rate: number;
}): UnionMember {
    return Object.freeze({
        getEmployeeId() {
            return employeeId;
        },
        getMemberId() {
            return memberId;
        },
        getRate() {
            return rate;
        },
        toJSON() {
            return { employeeId, memberId, rate };
        }
    });
}
