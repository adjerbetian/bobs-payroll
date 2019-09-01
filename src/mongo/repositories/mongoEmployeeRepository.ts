import {
    CommissionedEmployee,
    CoreDependencies,
    Employee,
    EmployeeType,
    HourlyEmployee,
    SalariedEmployee
} from "../../domain";
import { MongoDbAdapter } from "../mongoDbAdapter";

export function buildMongoEmployeeRepository(db: MongoDbAdapter<Employee>): CoreDependencies["employeeRepository"] {
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
        },

        async fetchAllHourly(): Promise<HourlyEmployee[]> {
            const employees = await db.fetchAll({ "work.type": EmployeeType.HOURLY });
            return employees as HourlyEmployee[];
        },
        async fetchAllSalaried(): Promise<SalariedEmployee[]> {
            const employees = await db.fetchAll({ "work.type": EmployeeType.SALARIED });
            return employees as SalariedEmployee[];
        },
        async fetchAllCommissioned(): Promise<CommissionedEmployee[]> {
            const employees = await db.fetchAll({ "work.type": EmployeeType.COMMISSIONED });
            return employees as CommissionedEmployee[];
        }
    };
}
