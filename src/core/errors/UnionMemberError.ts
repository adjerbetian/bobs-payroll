import { Employee } from "../entities";

export class UnionMemberError extends Error {
    public constructor(employee: Employee) {
        super(`Expected the employee ${employee.id} to be a union member`);
    }
}
