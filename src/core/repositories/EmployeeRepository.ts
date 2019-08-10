import { Employee } from "../entities";

export interface EmployeeRepository {
    fetchById(id: number): Promise<Employee>;
    fetchEmployeeByMemberId(memberId: string | undefined): Promise<Employee>;
    insertOne(employee: Employee): Promise<void>;
    exists(query: Partial<Employee>): Promise<boolean>;
    deleteById(id: number): Promise<void>;
}
