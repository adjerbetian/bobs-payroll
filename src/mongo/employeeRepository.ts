import { Employee } from "../entities";
import { dbEmployees } from "./db";
import { FilterQuery } from "mongodb";
import { NotFoundError } from "../errors";
import { EmployeeRepository } from "../repositories";

export const employeeRepository: EmployeeRepository = {
    async fetchEmployeeById(id: number): Promise<Employee> {
        return fetchIt({ id });
    },
    async insertOne(employee: Employee): Promise<void> {
        await dbEmployees.insertOne(employee);
        // @ts-ignore
        delete employee._id;
    }
};

async function fetchIt(query: FilterQuery<Employee>): Promise<Employee> {
    const employee = await dbEmployees.findOne(query);
    if (!employee) {
        throw new NotFoundError(`no employee matching ${JSON.stringify(query)} was found`);
    }
    delete employee._id;
    return employee;
}
