import { Employee } from "../entities";

export class EmployeeTypeError extends Error {
    public constructor(employee: Employee, expectedType: string) {
        super(
            `Expected the employee ${employee.id} to have type ${expectedType} but was ${employee.type}`
        );
    }
}
