import { Employee } from "../../core";

export class UnionMemberError extends Error {
    public constructor(employee: Employee) {
        super(`Expected the employee ${employee.getId()} to be a union member`);
    }
}
