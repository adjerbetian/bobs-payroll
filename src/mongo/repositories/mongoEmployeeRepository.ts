import { Employee, EmployeeRepository } from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";

export function buildMongoEmployeeRepository(db: MongoDbAdapter<Employee>): EmployeeRepository {
    return {
        async fetchById(id: number): Promise<Employee> {
            return db.fetch({ id });
        },
        async insert(employee: Employee): Promise<void> {
            return db.insert(employee);
        },
        async exists(query: Partial<Employee>): Promise<boolean> {
            return db.exists(query);
        },
        async deleteById(id: number): Promise<void> {
            await db.remove({ id });
        },
        async updateById(id: number, update: Partial<Employee>): Promise<void> {
            await db.update({ id }, { $set: update });
        }
    };
}
