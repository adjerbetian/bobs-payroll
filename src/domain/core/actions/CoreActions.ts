import { CreateSalesReceipt } from "./createSalesReceipt";
import { CreateServiceCharge } from "./createServiceCharge";
import { CreateTimeCard } from "./createTimeCard";
import { CreateUnionMember } from "./createUnionMember";
import { CreateEmployee, DeleteEmployee, UpdateEmployee } from "./employees";
import { RemoveEmployeeFromUnion } from "./removeEmployeeFromUnion";
import { SetEmployeePaymentMethod } from "./setEmployeePaymentMethod";

export interface CoreActions {
    deleteEmployee: DeleteEmployee;
    createTimeCard: CreateTimeCard;
    createServiceCharge: CreateServiceCharge;
    createSalesReceipt: CreateSalesReceipt;
    createEmployee: CreateEmployee;
    updateEmployee: UpdateEmployee;
    setEmployeePaymentMethod: SetEmployeePaymentMethod;
    createUnionMember: CreateUnionMember;
    removeEmployeeFromUnion: RemoveEmployeeFromUnion;
}
