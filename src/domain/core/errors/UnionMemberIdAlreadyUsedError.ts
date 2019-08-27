export class UnionMemberIdAlreadyUsedError extends Error {
    public constructor(memberId: string) {
        super(`The member id ${memberId} is already used by another employee`);
    }
}
