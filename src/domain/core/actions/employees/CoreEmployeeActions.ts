import { CreateEmployee } from "./createEmployee";
import { DeleteEmployee } from "./deleteEmployee";
import { UpdateEmployee } from "./updateEmployee";

export interface CoreEmployeeActions {
    deleteEmployee: DeleteEmployee;
    createEmployee: CreateEmployee;
    updateEmployee: UpdateEmployee;
}
