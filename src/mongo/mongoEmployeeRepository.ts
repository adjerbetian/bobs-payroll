import { UpdateQuery } from "mongodb";
import { Employee, EmployeeRepository, EmployeeType } from "../domain";
import { dbEmployees } from "./db";

export const mongoEmployeeRepository: EmployeeRepository = {
    async fetchById(id: number): Promise<Employee> {
        return dbEmployees.fetch({ id });
    },
    async insertOne(employee: Employee): Promise<void> {
        return dbEmployees.insert(employee);
    },
    async exists(query: Partial<Employee>): Promise<boolean> {
        return dbEmployees.exists(query);
    },
    async deleteById(id: number): Promise<void> {
        await dbEmployees.remove({ id });
    },
    async updateById(id: number, update: Partial<Employee>): Promise<void> {
        await dbEmployees.update({ id }, buildUpdate());

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
