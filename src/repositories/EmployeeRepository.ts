import { Employee } from "../entities";

export interface EmployeeRepository {
    fetchEmployeeById(id: number): Promise<Employee>;
    insertOne(employee: Employee): Promise<void>;
}
