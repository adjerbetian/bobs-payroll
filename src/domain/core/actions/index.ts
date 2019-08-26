import {
    EmployeeRepository,
    ServiceChargeRepository,
    TimeCardRepository,
    UnionMemberRepository
} from "../repositories";
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
}

export interface ActionsDependencies {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    serviceChargeRepository: ServiceChargeRepository;
    unionMemberRepository: UnionMemberRepository;
}

export function buildActions({
    employeeRepository,
    timeCardRepository,
    serviceChargeRepository,
    unionMemberRepository
}: ActionsDependencies): Actions {
    return {
        deleteEmployee: buildDeleteEmployeeAction({ employeeRepository }),
        createTimeCard: buildCreateTimeCardAction({ employeeRepository, timeCardRepository }),
        createServiceCharge: buildCreateServiceChargeAction({ serviceChargeRepository, unionMemberRepository })
    };
}
