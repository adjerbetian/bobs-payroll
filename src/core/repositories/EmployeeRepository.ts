import { Employee } from "../entities";

export interface EmployeeRepository {
    fetchEmployeeById(id: number): Promise<Employee>;
    fetchEmployeeByMemberId(memberId: string): Promise<Employee>;
    insertOne(employee: Employee): Promise<void>;
    exists(query: Partial<Employee>): Promise<boolean>;
    deleteById(id: number): Promise<void>;
}
