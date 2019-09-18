import { EmployeeUpdateModel } from "../requestModels";
import { CommissionedEmployee, Employee, HourlyEmployee, SalariedEmployee } from "../entities";

export interface EmployeeRepository {
    fetchById(id: number): Promise<Employee>;
    insert(employee: Employee): Promise<void>;
    exists(employeeId: number): Promise<boolean>;
    updateById(id: number, update: EmployeeUpdateModel): Promise<void>;
    deleteById(id: number): Promise<void>;

    fetchAllHourly(): Promise<HourlyEmployee[]>;
    fetchAllSalaried(): Promise<SalariedEmployee[]>;
    fetchAllCommissioned(): Promise<CommissionedEmployee[]>;
}
