import { EmployeeType, SalariedEmployee } from "../Employee";

export function buildSalariedEmployee({
    id,
    name,
    address,
    salary
}: {
    id: number;
    name: string;
    address: string;
    salary: number;
}): SalariedEmployee {
    return Object.freeze({
        getId() {
            return id;
        },
        getAddress() {
            return address;
        },
        getName() {
            return name;
        },
        getType() {
            return EmployeeType.SALARIED;
        },
        hasType(type: EmployeeType) {
            return type === EmployeeType.SALARIED;
        },
        getSalary() {
            return salary;
        },
        toJSON() {
            return {
                id,
                name,
                address,
                salary,
                type: EmployeeType.SALARIED
            };
        }
    });
}
