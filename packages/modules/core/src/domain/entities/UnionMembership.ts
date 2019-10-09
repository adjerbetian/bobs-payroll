import { Entity } from "./Entity";

export interface UnionMembership extends Entity {
    getEmployeeId(): number;
    getMemberId(): string;
    getRate(): number;
}

export function buildUnionMembership({
    rate,
    memberId,
    employeeId
}: {
    employeeId: number;
    memberId: string;
    rate: number;
}): UnionMembership {
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
            return {
                entity: "UnionMembership",
                employeeId,
                memberId,
                rate
            };
        }
    });
}
