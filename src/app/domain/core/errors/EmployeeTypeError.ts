import { Employee, EmployeeType } from "../entities";

export class EmployeeTypeError extends Error {
    public constructor(employee: Employee, expectedType: EmployeeType) {
        super(`Expected the employee ${employee.getId()} to have type ${expectedType} but was ${employee.getType()}`);
    }
}
