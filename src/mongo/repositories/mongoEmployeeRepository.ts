import {
    buildCommissionedEmployee,
    buildHourlyEmployee,
    buildSalariedEmployee,
    CommissionedEmployee,
    CoreDependencies,
    Employee,
    EmployeeType,
    HourlyEmployee,
    SalariedEmployee
} from "../../domain";
import {
    CommissionedEmployeeDBModel,
    EmployeeDBModel,
    HourlyEmployeeDBModel,
    SalariedEmployeeDBModel
} from "../DBModels";
import { MongoDbAdapter } from "../databases";

export function makeMongoEmployeeRepository(
    db: MongoDbAdapter<EmployeeDBModel>
): CoreDependencies["employeeRepository"] {
    return {
        async fetchById(id) {
            const model = await db.fetch({ id });
            return toEntity(model);
        },
        async insert(employee) {
            return db.insert(toDBModel(employee));
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
            return employees.map(employee => toEntity(employee));
        },
        async fetchAllSalaried() {
            const employees = (await db.fetchAll({ type: EmployeeType.SALARIED })) as SalariedEmployeeDBModel[];
            return employees.map(employee => toEntity(employee));
        },
        async fetchAllCommissioned() {
            const employees = (await db.fetchAll({ type: EmployeeType.COMMISSIONED })) as CommissionedEmployeeDBModel[];
            return employees.map(employee => toEntity(employee));
        }
    };
}

function toDBModel(employee: Employee): EmployeeDBModel {
    if (employee.hasType(EmployeeType.HOURLY)) {
        return {
            id: employee.getId(),
            name: employee.getName(),
            address: employee.getAddress(),
            type: employee.getType(),
            hourlyRate: employee.getHourlyRate()
        };
    }
    if (employee.hasType(EmployeeType.SALARIED)) {
        return {
            id: employee.getId(),
            name: employee.getName(),
            address: employee.getAddress(),
            type: employee.getType(),
            salary: employee.getSalary()
        };
    }
    if (employee.hasType(EmployeeType.COMMISSIONED)) {
        return {
            id: employee.getId(),
            name: employee.getName(),
            address: employee.getAddress(),
            type: employee.getType(),
            salary: employee.getSalary(),
            commissionRate: employee.getCommissionRate()
        };
    }
    throw new Error(`unknown type for employee: ${employee}`);
}

function toEntity(model: HourlyEmployeeDBModel): HourlyEmployee;
function toEntity(model: SalariedEmployeeDBModel): SalariedEmployee;
function toEntity(model: CommissionedEmployeeDBModel): CommissionedEmployee;
function toEntity(model: EmployeeDBModel): Employee;
function toEntity(model: EmployeeDBModel): Employee {
    if (model.type === EmployeeType.HOURLY) {
        return buildHourlyEmployee(model);
    }
    if (model.type === EmployeeType.SALARIED) {
        return buildSalariedEmployee(model);
    }
    if (model.type === EmployeeType.COMMISSIONED) {
        return buildCommissionedEmployee(model);
    }
    throw new Error(`unknown type for employee model: ${model}`);
}
