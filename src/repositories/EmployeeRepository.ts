import { Employee } from "../entities/Employee";

export interface EmployeeRepository {
    fetchEmployeeById(id: number): Promise<Employee>;
    insertOne(employee: Employee): Promise<void>;
}
