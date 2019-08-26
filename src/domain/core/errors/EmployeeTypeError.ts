import { Employee, EmployeeType } from "../../core";

export class EmployeeTypeError extends Error {
    public constructor(employee: Employee, expectedType: EmployeeType) {
        super(`Expected the employee ${employee.id} to have type ${expectedType} but was ${employee.work.type}`);
    }
}
