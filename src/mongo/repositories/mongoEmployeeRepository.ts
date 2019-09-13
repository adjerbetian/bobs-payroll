import { CoreDependencies, EmployeeType } from "../../domain";
import { MongoDbAdapter } from "../databases";
import {
    CommissionedEmployeeDBModel,
    EmployeeDBModel,
    HourlyEmployeeDBModel,
    SalariedEmployeeDBModel
} from "../DBModels";
import { employeeMapper } from "../mappers";

export function makeMongoEmployeeRepository(
    db: MongoDbAdapter<EmployeeDBModel>
): CoreDependencies["employeeRepository"] {
    return {
        async fetchById(id) {
            const model = await db.fetch({ id });
            return employeeMapper.toEntity(model);
        },
        async insert(employee) {
            return db.insert(employeeMapper.toDBModel(employee));
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
            const employees = (await db.fetchAll({ type: EmployeeType.HOURLY })) as HourlyEmployeeDBModel[];
            return employees.map(employee => employeeMapper.toEntity(employee));
        },
        async fetchAllSalaried() {
            const employees = (await db.fetchAll({ type: EmployeeType.SALARIED })) as SalariedEmployeeDBModel[];
            return employees.map(employee => employeeMapper.toEntity(employee));
        },
        async fetchAllCommissioned() {
            const employees = (await db.fetchAll({ type: EmployeeType.COMMISSIONED })) as CommissionedEmployeeDBModel[];
            return employees.map(employee => employeeMapper.toEntity(employee));
        }
    };
}
