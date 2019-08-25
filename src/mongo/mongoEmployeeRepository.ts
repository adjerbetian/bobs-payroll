import { UpdateQuery } from "mongodb";
import { Employee, EmployeeRepository, EmployeeType } from "../domain";
import { dbEmployees } from "./db";
import { MongoDbAdapter } from "./mongoDbAdapter";

export const mongoEmployeeRepository: EmployeeRepository = buildMongoEmployeeRepository(dbEmployees);

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
            await db.update({ id }, buildUpdate());

            function buildUpdate(): UpdateQuery<Employee> {
                if (update.type) {
                    return { $set: update, $unset: buildUnset() };
                } else {
                    return { $set: update };
                }
            }

            function buildUnset(): Record<string, string> | undefined {
                if (update.type === EmployeeType.HOURLY) {
                    return {
                        monthlySalary: "",
                        commissionRate: ""
                    };
                }
                if (update.type === EmployeeType.SALARIED) {
                    return {
                        hourlyRate: "",
                        commissionRate: ""
                    };
                }
                if (update.type === EmployeeType.COMMISSIONED) {
                    return {
                        hourlyRate: ""
                    };
                }
                throw new Error("invalid type");
            }
        }
    };
}
