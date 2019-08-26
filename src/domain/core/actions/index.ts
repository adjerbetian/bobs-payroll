import {
    EmployeeRepository,
    SalesReceiptRepository,
    ServiceChargeRepository,
    TimeCardRepository,
    UnionMemberRepository
} from "../repositories";
import { buildCreateSalesReceiptAction, CreateSalesReceiptAction } from "./createSalesReceipt";
import { buildCreateServiceChargeAction, CreateServiceChargeAction } from "./createServiceCharge";
import { buildDeleteEmployeeAction, DeleteEmployeeAction } from "./deleteEmployee";
import { buildCreateTimeCardAction, CreateTimeCardAction } from "./createTimeCard";

export { DeleteEmployeeAction } from "./deleteEmployee";
export { CreateTimeCardAction } from "./createTimeCard";
export { CreateServiceChargeAction } from "./createServiceCharge";

export interface Actions {
    deleteEmployee: DeleteEmployeeAction;
    createTimeCard: CreateTimeCardAction;
    createServiceCharge: CreateServiceChargeAction;
    createSalesReceipt: CreateSalesReceiptAction;
}

export interface ActionsDependencies {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    serviceChargeRepository: ServiceChargeRepository;
    unionMemberRepository: UnionMemberRepository;
    salesReceiptRepository: SalesReceiptRepository;
}

export function buildActions({
    employeeRepository,
    timeCardRepository,
    serviceChargeRepository,
    unionMemberRepository,
    salesReceiptRepository
}: ActionsDependencies): Actions {
    return {
        deleteEmployee: buildDeleteEmployeeAction({ employeeRepository }),
        createTimeCard: buildCreateTimeCardAction({ employeeRepository, timeCardRepository }),
        createServiceCharge: buildCreateServiceChargeAction({ serviceChargeRepository, unionMemberRepository }),
        createSalesReceipt: buildCreateSalesReceiptAction({ employeeRepository, salesReceiptRepository })
    };
}
