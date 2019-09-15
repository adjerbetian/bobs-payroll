import { Entity } from "./Entity";

export interface ServiceCharge extends Entity {
    getMemberId(): string;
    getAmount(): number;
}

export function buildServiceCharge({ memberId, amount }: { memberId: string; amount: number }): ServiceCharge {
    return Object.freeze({
        getMemberId() {
            return memberId;
        },
        getAmount() {
            return amount;
        },
        toJSON() {
            return {
                memberId,
                amount
            };
        }
    });
}
