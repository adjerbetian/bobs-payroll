import { EmployeeUpdate } from "../common";
import { CommissionedEmployee, Employee, HourlyEmployee, SalariedEmployee } from "../entities";

export interface EmployeeRepository {
    fetchById(id: number): Promise<Employee>;
    insert(employee: Employee): Promise<void>;
    exists(employeeId: number): Promise<boolean>;
    updateById(id: number, update: EmployeeUpdate): Promise<void>;
    deleteById(id: number): Promise<void>;

    fetchAllHourly(): Promise<HourlyEmployee[]>;
    fetchAllSalaried(): Promise<SalariedEmployee[]>;
    fetchAllCommissioned(): Promise<CommissionedEmployee[]>;
}
