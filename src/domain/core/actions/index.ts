import {
    EmployeeRepository,
    PaymentMethodRepository,
    PaymentRepository,
    SalesReceiptRepository,
    ServiceChargeRepository,
    TimeCardRepository,
    UnionMemberRepository
} from "../repositories";
import { buildCreateSalesReceiptAction, CreateSalesReceiptAction } from "./createSalesReceipt";
import { buildCreateServiceChargeAction, CreateServiceChargeAction } from "./createServiceCharge";
import { buildCreateTimeCardAction, CreateTimeCardAction } from "./createTimeCard";
import { buildCreateUnionMemberAction, CreateUnionMemberAction } from "./createUnionMember";
import {
    buildCreateEmployeeAction,
    buildDeleteEmployeeAction,
    buildUpdateEmployeeAction,
    CreateEmployeeAction,
    DeleteEmployeeAction,
    UpdateEmployeeAction
} from "./employees";
import { buildRemoveEmployeeFromUnionAction, RemoveEmployeeFromUnionAction } from "./removeEmployeeFromUnion";
import { buildRunPayrollAction, RunPayrollAction } from "./payroll";
import { buildSetEmployeePaymentMethodAction, SetEmployeePaymentMethodAction } from "./setEmployeePaymentMethod";

export interface Actions {
    deleteEmployee: DeleteEmployeeAction;
    createTimeCard: CreateTimeCardAction;
    createServiceCharge: CreateServiceChargeAction;
    createSalesReceipt: CreateSalesReceiptAction;
    createEmployee: CreateEmployeeAction;
    updateEmployee: UpdateEmployeeAction;
    setEmployeePaymentMethod: SetEmployeePaymentMethodAction;
    createUnionMember: CreateUnionMemberAction;
    removeEmployeeFromUnion: RemoveEmployeeFromUnionAction;
    runPayroll: RunPayrollAction;
}

export interface ActionsDependencies {
    employeeRepository: EmployeeRepository;
    timeCardRepository: TimeCardRepository;
    serviceChargeRepository: ServiceChargeRepository;
    unionMemberRepository: UnionMemberRepository;
    salesReceiptRepository: SalesReceiptRepository;
    paymentMethodRepository: PaymentMethodRepository;
    paymentRepository: PaymentRepository;
}

export function buildActions({
    employeeRepository,
    timeCardRepository,
    serviceChargeRepository,
    unionMemberRepository,
    salesReceiptRepository,
    paymentMethodRepository,
    paymentRepository
}: ActionsDependencies): Actions {
    return {
        deleteEmployee: buildDeleteEmployeeAction({ employeeRepository }),
        createTimeCard: buildCreateTimeCardAction({ employeeRepository, timeCardRepository }),
        createServiceCharge: buildCreateServiceChargeAction({ serviceChargeRepository, unionMemberRepository }),
        createSalesReceipt: buildCreateSalesReceiptAction({ employeeRepository, salesReceiptRepository }),
        createEmployee: buildCreateEmployeeAction({ employeeRepository }),
        updateEmployee: buildUpdateEmployeeAction({ employeeRepository }),
        setEmployeePaymentMethod: buildSetEmployeePaymentMethodAction({ paymentMethodRepository }),
        createUnionMember: buildCreateUnionMemberAction({ unionMemberRepository, employeeRepository }),
        removeEmployeeFromUnion: buildRemoveEmployeeFromUnionAction({ unionMemberRepository }),
        runPayroll: buildRunPayrollAction({
            paymentRepository,
            timeCardRepository,
            paymentMethodRepository,
            employeeRepository,
            salesReceiptRepository
        })
    };
}
