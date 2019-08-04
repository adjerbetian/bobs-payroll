import { Employee } from "../entities";

export class WrongEmployeeTypeError extends Error {
    public constructor(employee: Employee, expectedType: string) {
        super(
            `Expected the employee ${employee.id} to have type ${expectedType} but was ${employee.type}`
        );
    }
}
