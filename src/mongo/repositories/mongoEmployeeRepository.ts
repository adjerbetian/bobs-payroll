import {
    CommissionedEmployee,
    CoreDependencies,
    Employee,
    EmployeeType,
    HourlyEmployee,
    SalariedEmployee
} from "../../domain";
import { MongoEntity } from "../databases";

export function makeMongoEmployeeRepository(db: MongoEntity<Employee>): CoreDependencies["employeeRepository"] {
    return {
        async fetchById(id) {
            return db.fetch({ id });
        },
        async insert(employee) {
            return db.insert(employee);
        },
        async exists(id) {
            return db.exists({ id });
        },
        async deleteById(id) {
            await db.remove({ id });
        },
        async updateById(id, update) {
            await db.update({ id }, { $set: update });
        },

        async fetchAllHourly() {
            return (await db.fetchAll({ type: EmployeeType.HOURLY })) as HourlyEmployee[];
        },
        async fetchAllSalaried() {
            return (await db.fetchAll({ type: EmployeeType.SALARIED })) as SalariedEmployee[];
        },
        async fetchAllCommissioned() {
            return (await db.fetchAll({ type: EmployeeType.COMMISSIONED })) as CommissionedEmployee[];
        }
    };
}
