import {
    EmployeeRepository,
    PaymentMethodRepository,
    SalesReceiptRepository,
    ServiceChargeRepository,
    TimeCardRepository,
    UnionMemberRepository
} from "../repositories";
import { buildCreateEmployeeAction, CreateEmployeeAction } from "./createEmployee";
import { buildCreateSalesReceiptAction, CreateSalesReceiptAction } from "./createSalesReceipt";
import { buildCreateServiceChargeAction, CreateServiceChargeAction } from "./createServiceCharge";
import { buildDeleteEmployeeAction, DeleteEmployeeAction } from "./deleteEmployee";
import { buildCreateTimeCardAction, CreateTimeCardAction } from "./createTimeCard";
import { buildSetEmployeePaymentMethodAction, SetEmployeePaymentMethodAction } from "./setEmployeePaymentMethod";
import { buildUpdateEmployeeAction, UpdateEmployeeAction } from "./updateEmployee";

export interface Actions {
    deleteEmployee: DeleteEmployeeAction;
    createTimeCard: CreateTimeCardAction;
    createServiceCharge: CreateServiceChargeAction;
    createSalesReceipt: CreateSalesReceiptAction;
    createEmployee: CreateEmployeeAction;
    updateEmployee: UpdateEmployeeAction;
    setEmployeePaymentMethod: SetEmployeePaymentMethodAction;
}

export interface ActionsDependencies {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    serviceChargeRepository: ServiceChargeRepository;
    unionMemberRepository: UnionMemberRepository;
    salesReceiptRepository: SalesReceiptRepository;
    paymentMethodRepository: PaymentMethodRepository;
}

export function buildActions({
    employeeRepository,
    timeCardRepository,
    serviceChargeRepository,
    unionMemberRepository,
    salesReceiptRepository,
    paymentMethodRepository
}: ActionsDependencies): Actions {
    return {
        deleteEmployee: buildDeleteEmployeeAction({ employeeRepository }),
        createTimeCard: buildCreateTimeCardAction({ employeeRepository, timeCardRepository }),
        createServiceCharge: buildCreateServiceChargeAction({ serviceChargeRepository, unionMemberRepository }),
        createSalesReceipt: buildCreateSalesReceiptAction({ employeeRepository, salesReceiptRepository }),
        createEmployee: buildCreateEmployeeAction({ employeeRepository }),
        updateEmployee: buildUpdateEmployeeAction({ employeeRepository }),
        setEmployeePaymentMethod: buildSetEmployeePaymentMethodAction({ paymentMethodRepository })
    };
}
