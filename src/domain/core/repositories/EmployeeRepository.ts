import { Employee } from "../entities";

export interface EmployeeRepository {
    fetchById(id: number): Promise<Employee>;
    insert(employee: Employee): Promise<void>;
    exists(query: Partial<Employee>): Promise<boolean>;
    updateById(id: number, update: Partial<Employee>): Promise<void>;
    deleteById(id: number): Promise<void>;
}
